import { Clarinet, Tx, Chain, Account, types } from "clarinet";

// Security-focused tests
Clarinet.test({
  name: "users cannot set themselves as referrer",
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

    // Try to buy pass with self as referrer (should not get discount)
    const initialBalance = chain.getAssetsMaps().assets['STX'][user.address];
    
    chain.mineBlock([
      Tx.contractCall("pass-manager", "buy-pass", 
        [types.some(types.principal(user.address))], 
        user.address),
    ]);

    // Should pay full price (no discount)
    const finalBalance = chain.getAssetsMaps().assets['STX'][user.address];
    const paid = initialBalance - finalBalance;
    
    // Full price is 500000, should not be discounted
    paid.expectUint(500000);
  },
});

Clarinet.test({
  name: "only owner can change parameters",
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

    // User tries to change price (should fail)
    let block = chain.mineBlock([
      Tx.contractCall("pass-manager", "set-params", 
        [
          types.uint(1000000), // Attempt to double price
          types.uint(2000),
          types.uint(8000),
          types.uint(500),
          types.uint(144),
          types.principal(vault.address)
        ], 
        user.address),
    ]);
    
    block.receipts[0].result.expectErr().expectUint(102); // err-not-owner

    // Owner can change parameters
    block = chain.mineBlock([
      Tx.contractCall("pass-manager", "set-params", 
        [
          types.uint(600000),
          types.uint(2000),
          types.uint(8000),
          types.uint(500),
          types.uint(144),
          types.principal(vault.address)
        ], 
        deployer.address),
    ]);
    
    block.receipts[0].result.expectOk().expectBool(true);
  },
});

Clarinet.test({
  name: "bootstrap can only be called once",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const vault = accounts.get("wallet_1")!;

    // First bootstrap succeeds
    let block = chain.mineBlock([
      Tx.contractCall("pass-manager", "bootstrap", 
        [types.principal(deployer.address), types.principal(vault.address)], 
        deployer.address),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);

    // Second bootstrap fails
    block = chain.mineBlock([
      Tx.contractCall("pass-manager", "bootstrap", 
        [types.principal(deployer.address), types.principal(vault.address)], 
        deployer.address),
    ]);
    block.receipts[0].result.expectErr().expectUint(100); // err-owner-set
  },
});

Clarinet.test({
  name: "invalid fee split parameters are rejected",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const vault = accounts.get("wallet_1")!;

    // Bootstrap
    chain.mineBlock([
      Tx.contractCall("pass-manager", "bootstrap", 
        [types.principal(deployer.address), types.principal(vault.address)], 
        deployer.address),
    ]);

    // Try to set fee split > 100%
    let block = chain.mineBlock([
      Tx.contractCall("pass-manager", "set-params", 
        [
          types.uint(500000),
          types.uint(1000),
          types.uint(10001), // > 10000 (100%)
          types.uint(500),
          types.uint(144),
          types.principal(vault.address)
        ], 
        deployer.address),
    ]);
    
    // Should fail validation
    block.receipts[0].result.expectErr().expectUint(300); // err-invalid-amount
  },
});

