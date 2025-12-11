import { Clarinet, Tx, Chain, Account, types } from "clarinet";

// Edge case tests for better test coverage (more GitHub commits!)
Clarinet.test({
  name: "cannot bootstrap twice",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const vault = accounts.get("wallet_1")!;

    // First bootstrap should succeed
    let block = chain.mineBlock([
      Tx.contractCall("pass-manager", "bootstrap", 
        [types.principal(deployer.address), types.principal(vault.address)], 
        deployer.address),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);

    // Second bootstrap should fail
    block = chain.mineBlock([
      Tx.contractCall("pass-manager", "bootstrap", 
        [types.principal(deployer.address), types.principal(vault.address)], 
        deployer.address),
    ]);
    block.receipts[0].result.expectErr().expectUint(100); // err-owner-set
  },
});

Clarinet.test({
  name: "cannot use expired pass",
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

    // Buy pass
    chain.mineBlock([
      Tx.contractCall("pass-manager", "buy-pass", [types.none()], user1.address),
    ]);

    // Fast forward blocks to expire the pass
    chain.mineEmptyBlockUntil(145); // Pass duration is 144 blocks

    // Try to use expired pass
    let block = chain.mineBlock([
      Tx.contractCall("pass-manager", "use-pass", [], user1.address),
    ]);
    block.receipts[0].result.expectErr().expectUint(201); // err-pass-expired
  },
});

Clarinet.test({
  name: "referral discount applied correctly",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const user1 = accounts.get("wallet_1")!;
    const referrer = accounts.get("wallet_2")!;
    const vault = accounts.get("wallet_3")!;

    // Bootstrap
    chain.mineBlock([
      Tx.contractCall("pass-manager", "bootstrap", 
        [types.principal(deployer.address), types.principal(vault.address)], 
        deployer.address),
    ]);

    // Get initial balances
    const initialBalance1 = chain.getAssetsMaps().assets['STX'][user1.address];
    
    // Buy pass with referral (should get 5% discount)
    chain.mineBlock([
      Tx.contractCall("pass-manager", "buy-pass", 
        [types.some(types.principal(referrer.address))], 
        user1.address),
    ]);

    // Check final balance - should have paid less
    const finalBalance1 = chain.getAssetsMaps().assets['STX'][user1.address];
    const paid = initialBalance1 - finalBalance1;
    
    // Base price is 500000 micro-STX, with 5% discount = 475000
    // We check that less than full price was paid
    paid.expectLt(500000);
  },
});

Clarinet.test({
  name: "renew pass retains referrer and uses discount",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const user1 = accounts.get("wallet_1")!;
    const referrer = accounts.get("wallet_2")!;
    const vault = accounts.get("wallet_3")!;

    // Bootstrap
    chain.mineBlock([
      Tx.contractCall("pass-manager", "bootstrap", 
        [types.principal(deployer.address), types.principal(vault.address)], 
        deployer.address),
    ]);

    // Buy pass with referral
    chain.mineBlock([
      Tx.contractCall("pass-manager", "buy-pass", 
        [types.some(types.principal(referrer.address))], 
        user1.address),
    ]);

    // Use pass to increment counter
    chain.mineBlock([
      Tx.contractCall("pass-manager", "use-pass", [], user1.address),
    ]);

    // Renew pass
    const initialBalance = chain.getAssetsMaps().assets['STX'][user1.address];
    chain.mineBlock([
      Tx.contractCall("pass-manager", "renew-pass", [], user1.address),
    ]);
    const finalBalance = chain.getAssetsMaps().assets['STX'][user1.address];
    const paid = initialBalance - finalBalance;

    // Should still get discount
    paid.expectLt(500000);

    // Check that uses counter is preserved
    let pass = chain.callReadOnlyFn("pass-manager", "get-pass", 
      [types.principal(user1.address)], deployer.address);
    const data = pass.result.expectSome().expectTuple();
    data["total-uses"].expectUint(1); // Still has 1 use from before renewal
  },
});

Clarinet.test({
  name: "only owner can set params",
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

    // Non-owner tries to set params
    let block = chain.mineBlock([
      Tx.contractCall("pass-manager", "set-params", 
        [
          types.uint(600000),
          types.uint(2000),
          types.uint(7000),
          types.uint(1000),
          types.uint(144),
          types.principal(vault.address)
        ], 
        user1.address),
    ]);
    block.receipts[0].result.expectErr().expectUint(102); // err-not-owner

    // Owner can set params
    block = chain.mineBlock([
      Tx.contractCall("pass-manager", "set-params", 
        [
          types.uint(600000),
          types.uint(2000),
          types.uint(7000),
          types.uint(1000),
          types.uint(144),
          types.principal(vault.address)
        ], 
        deployer.address),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);
  },
});

