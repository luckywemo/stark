import { Clarinet, Tx, Chain, Account, types } from "clarinet";

// Basic happy-path coverage for pass purchase, renewal, and usage.
Clarinet.test({
  name: "bootstrap, buy, renew, and use pass",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const user1 = accounts.get("wallet_1")!;
    const user2 = accounts.get("wallet_2")!;
    const vault = accounts.get("wallet_3")!;

    // bootstrap
    let block = chain.mineBlock([
      Tx.contractCall("pass-manager", "bootstrap", [types.principal(deployer.address), types.principal(vault.address)], deployer.address),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy pass with referral
    block = chain.mineBlock([
      Tx.contractCall("pass-manager", "buy-pass", [types.some(types.principal(user2.address))], user1.address),
    ]);
    block.receipts[0].result.expectOk();

    // check active status
    let active = chain.callReadOnlyFn("pass-manager", "is-active", [types.principal(user1.address)], deployer.address);
    active.result.expectBool(true);

    // use pass
    block = chain.mineBlock([
      Tx.contractCall("pass-manager", "use-pass", [], user1.address),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);

    // renew pass (retains referrer)
    block = chain.mineBlock([
      Tx.contractCall("pass-manager", "renew-pass", [], user1.address),
    ]);
    block.receipts[0].result.expectOk();

    // check pass data
    let pass = chain.callReadOnlyFn("pass-manager", "get-pass", [types.principal(user1.address)], deployer.address);
    const data = pass.result.expectSome().expectTuple();
    data["total-uses"].expectUint(1);
  },
});

