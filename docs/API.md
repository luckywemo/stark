# API Documentation

## Contract API

### Public Functions

#### `bootstrap`
One-time initialization of the contract.

**Parameters:**
- `admin` (principal): Contract owner address
- `vault` (principal): Community vault address

**Returns:** `(ok true)` on success

**Errors:**
- `u100` - Owner already set

**Example:**
```clarity
(bootstrap 'SP974PMENTVC61C8PAE8517T0MQ9FQ8ZRV9PNK01 'SP974PMENTVC61C8PAE8517T0MQ9FQ8ZRV9PNK01)
```

---

#### `buy-pass`
Purchase a new pass or extend an existing one.

**Parameters:**
- `maybe-referrer` (optional principal): Optional referrer address for discount

**Returns:** `(ok expires-at)` where `expires-at` is the block height when pass expires

**Errors:**
- `u300` - Invalid payment amount

**Example:**
```clarity
(buy-pass none)
(buy-pass (some 'ST1ABC...))
```

---

#### `renew-pass`
Renew an existing pass, extending its expiration.

**Returns:** `(ok expires-at)` - New expiration block height

**Errors:**
- `u200` - Pass not found

**Example:**
```clarity
(renew-pass)
```

---

#### `use-pass`
Use the pass, generating a usage fee.

**Returns:** `(ok true)` on success

**Errors:**
- `u200` - Pass not found
- `u201` - Pass expired

**Example:**
```clarity
(use-pass)
```

---

#### `set-params`
Owner-only function to update contract parameters.

**Parameters:**
- `new-price` (uint): New pass price in micro-STX
- `new-usage-fee` (uint): New usage fee in micro-STX
- `new-fee-split-bps` (uint): Fee split in basis points (0-10000)
- `new-referral-discount-bps` (uint): Referral discount in basis points (0-9999)
- `new-duration-blocks` (uint): Pass duration in blocks
- `new-vault` (principal): New vault address

**Returns:** `(ok true)` on success

**Errors:**
- `u102` - Not owner
- `u300` - Invalid amount

**Example:**
```clarity
(set-params u600000 u2000 u8000 u500 u144 'ST1VAULT...)
```

---

### Read-Only Functions

#### `get-pass`
Get pass data for a user.

**Parameters:**
- `user` (principal): User address

**Returns:** `(some {expires-at: uint, total-uses: uint, referrer: (optional principal)})` or `none`

**Example:**
```clarity
(get-pass 'ST1USER...)
```

---

#### `is-active`
Check if a user's pass is currently active.

**Parameters:**
- `user` (principal): User address

**Returns:** `true` or `false`

**Example:**
```clarity
(is-active 'ST1USER...)
```

---

#### `get-config`
Get contract configuration.

**Returns:** Tuple with:
- `owner`: (optional principal)
- `community-vault`: (optional principal)
- `pass-price`: uint
- `usage-fee`: uint
- `fee-split-bps`: uint
- `referral-discount-bps`: uint
- `pass-duration-blocks`: uint

**Example:**
```clarity
(get-config)
```

---

## Frontend API

### Stacks API Integration

The frontend uses the Stacks API for read-only contract calls:

#### Read Contract Function
```
POST /v2/contracts/call-read/{contract_id}/{function_name}
```

#### Get Transactions
```
GET /extended/v1/address/{address}/transactions
```

---

## Events

The contract emits events via `print` statements:

### `pass-purchased`
Emitted when a pass is purchased.
```clarity
{event: "pass-purchased", user: principal, expires-at: uint, price: uint}
```

### `pass-renewed`
Emitted when a pass is renewed.
```clarity
{event: "pass-renewed", user: principal, expires-at: uint, price: uint}
```

### `pass-used`
Emitted when a pass is used.
```clarity
{event: "pass-used", user: principal, at: uint}
```

---

## Error Codes

- `u100` - Owner already set
- `u101` - Owner not set
- `u102` - Not owner
- `u200` - Pass not found
- `u201` - Pass expired
- `u300` - Invalid amount
- `u400` - Invalid referrer

---

For more details, see the contract source code in `contracts/pass-manager.clar`.



