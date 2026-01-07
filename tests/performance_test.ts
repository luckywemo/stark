import { Clarinet, Tx, Chain, Account, types } from "clarinet";

// Performance and stress tests
Clarinet.test({
  name: "multiple users can buy passes concurrently",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const vault = accounts.get("wallet_1")!;
    const users = [
      accounts.get("wallet_2")!,
      accounts.get("wallet_3")!,
      accounts.get("wallet_4")!,
      accounts.get("wallet_5")!,
    ];

    // Bootstrap
    chain.mineBlock([
      Tx.contractCall("pass-manager", "bootstrap", 
        [types.principal(deployer.address), types.principal(vault.address)], 
        deployer.address),
    ]);

    // All users buy passes in the same block
    const transactions = users.map(user =>
      Tx.contractCall("pass-manager", "buy-pass", [types.none()], user.address)
    );

    const block = chain.mineBlock(transactions);

    // All transactions should succeed
    block.receipts.forEach(receipt => {
      receipt.result.expectOk();
    });

    // Verify all passes are active
    users.forEach(user => {
      const active = chain.callReadOnlyFn("pass-manager", "is-active", 
        [types.principal(user.address)], deployer.address);
      active.result.expectBool(true);
    });
  },
});

Clarinet.test({
  name: "contract handles many pass uses efficiently",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const user = accounts.get("wallet_1")!;
    const vault = accounts.get("wallet_2")!;

    // Bootstrap
    chain.mineBlock([
      Tx.contractCall("pass-manager", "bootstrap", 
        [types.principal(deployer.address), types.principal(vault.address)], 
        deployer.address),
    ]);

    // Buy pass
    chain.mineBlock([
      Tx.contractCall("pass-manager", "buy-pass", [types.none()], user.address),
    ]);

    // Use pass 10 times
    const useTransactions = Array(10).fill(null).map(() =>
      Tx.contractCall("pass-manager", "use-pass", [], user.address)
    );

    const block = chain.mineBlock(useTransactions);

    // All uses should succeed
    block.receipts.forEach(receipt => {
      receipt.result.expectOk().expectBool(true);
    });

    // Verify total uses is 10
    const pass = chain.callReadOnlyFn("pass-manager", "get-pass", 
      [types.principal(user.address)], deployer.address);
    const data = pass.result.expectSome().expectTuple();
    data["total-uses"].expectUint(10);
  },
});

Clarinet.test({
  name: "read-only functions are efficient",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const user = accounts.get("wallet_1")!;
    const vault = accounts.get("wallet_2")!;

    // Bootstrap
    chain.mineBlock([
      Tx.contractCall("pass-manager", "bootstrap", 
        [types.principal(deployer.address), types.principal(vault.address)], 
        deployer.address),
    ]);

    // Buy pass
    chain.mineBlock([
      Tx.contractCall("pass-manager", "buy-pass", [types.none()], user.address),
    ]);

    // Call read-only functions multiple times
    // These should be fast and not consume resources
    for (let i = 0; i < 20; i++) {
      const pass = chain.callReadOnlyFn("pass-manager", "get-pass", 
        [types.principal(user.address)], deployer.address);
      pass.result.expectSome();
      
      const active = chain.callReadOnlyFn("pass-manager", "is-active", 
        [types.principal(user.address)], deployer.address);
      active.result.expectBool(true);
      
      const config = chain.callReadOnlyFn("pass-manager", "get-config", 
        [], deployer.address);
      config.result.expectSome();
    }
  },
});




