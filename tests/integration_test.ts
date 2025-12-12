import { Clarinet, Tx, Chain, Account, types } from "clarinet";

// Integration tests for end-to-end workflows
Clarinet.test({
  name: "complete user journey: bootstrap, buy, use, renew",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const user1 = accounts.get("wallet_1")!;
    const user2 = accounts.get("wallet_2")!;
    const vault = accounts.get("wallet_3")!;

    // 1. Bootstrap
    let block = chain.mineBlock([
      Tx.contractCall("pass-manager", "bootstrap", 
        [types.principal(deployer.address), types.principal(vault.address)], 
        deployer.address),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);

    // 2. User buys pass with referral
    const initialBalance = chain.getAssetsMaps().assets['STX'][user1.address];
    block = chain.mineBlock([
      Tx.contractCall("pass-manager", "buy-pass", 
        [types.some(types.principal(user2.address))], 
        user1.address),
    ]);
    block.receipts[0].result.expectOk();
    
    // Verify payment was made (with discount)
    const afterPurchase = chain.getAssetsMaps().assets['STX'][user1.address];
    const paid = initialBalance - afterPurchase;
    paid.expectLt(500000); // Should be less than full price due to discount

    // 3. Verify pass is active
    let active = chain.callReadOnlyFn("pass-manager", "is-active", 
      [types.principal(user1.address)], deployer.address);
    active.result.expectBool(true);

    // 4. Use pass multiple times
    for (let i = 0; i < 3; i++) {
      block = chain.mineBlock([
        Tx.contractCall("pass-manager", "use-pass", [], user1.address),
      ]);
      block.receipts[0].result.expectOk().expectBool(true);
    }

    // 5. Verify usage count
    let pass = chain.callReadOnlyFn("pass-manager", "get-pass", 
      [types.principal(user1.address)], deployer.address);
    let data = pass.result.expectSome().expectTuple();
    data["total-uses"].expectUint(3);

    // 6. Renew pass
    block = chain.mineBlock([
      Tx.contractCall("pass-manager", "renew-pass", [], user1.address),
    ]);
    block.receipts[0].result.expectOk();

    // 7. Verify referrer retained after renewal
    pass = chain.callReadOnlyFn("pass-manager", "get-pass", 
      [types.principal(user1.address)], deployer.address);
    data = pass.result.expectSome().expectTuple();
    data.referrer.expectSome().expectPrincipal(user2.address);
    data["total-uses"].expectUint(3); // Uses should be preserved
  },
});

Clarinet.test({
  name: "fee splitting works correctly",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const user1 = accounts.get("wallet_1")!;
    const vault = accounts.get("wallet_2")!;

    // Bootstrap
    chain.mineBlock([
      Tx.contractCall("pass-manager", "bootstrap", 
        [types.principal(deployer.address), types.principal(vault.address)], 
        deployer.address),
    ]);

    // Get initial balances
    const ownerInitial = chain.getAssetsMaps().assets['STX'][deployer.address];
    const vaultInitial = chain.getAssetsMaps().assets['STX'][vault.address];

    // Buy pass (500000 micro-STX, 80% to owner, 20% to vault)
    chain.mineBlock([
      Tx.contractCall("pass-manager", "buy-pass", [types.none()], user1.address),
    ]);

    // Check balances
    const ownerFinal = chain.getAssetsMaps().assets['STX'][deployer.address];
    const vaultFinal = chain.getAssetsMaps().assets['STX'][vault.address];

    const ownerReceived = ownerFinal - ownerInitial;
    const vaultReceived = vaultFinal - vaultInitial;

    // 80% = 400000, 20% = 100000
    ownerReceived.expectUint(400000);
    vaultReceived.expectUint(100000);
  },
});

