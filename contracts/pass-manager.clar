;; Pass Manager + Fee Splitter
;; Designed for Stacks Builder Challenge: demonstrates fee flows, referral logic,
;; and is ready to plug in Clarity 4 built-ins where noted.

(define-constant err-owner-set (err u100))
(define-constant err-owner-unset (err u101))
(define-constant err-not-owner (err u102))
(define-constant err-pass-missing (err u200))
(define-constant err-pass-expired (err u201))
(define-constant err-invalid-amount (err u300))

(define-constant BASIS (u10000))

;; Governance
(define-data-var owner (optional principal) none)
(define-data-var community-vault (optional principal) none)

;; Economics
(define-data-var pass-price uint u500000)          ;; 0.5 STX (micro-STX)
(define-data-var usage-fee uint u1000)             ;; 0.001 STX fee per use
(define-data-var fee-split-bps uint u8000)         ;; 80% to owner, 20% to vault
(define-data-var referral-discount-bps uint u500)  ;; 5% discount if referred
(define-data-var pass-duration-blocks uint u144)   ;; ~1 day assuming ~10m blocks

(define-map passes
  principal
  {
    expires-at: uint,
    total-uses: uint,
    referrer: (optional principal)
  })

;; ========== helpers ==========

(define-private (owner-guard)
  (match (var-get owner)
    owner-principal (if (is-eq tx-sender owner-principal) (ok true) err-not-owner)
    (err-owner-unset)))

(define-private (unwrap-owner)
  (unwrap! (var-get owner) err-owner-unset))

(define-private (unwrap-vault-or-owner)
  (match (var-get community-vault)
    vault vault
    _ (some (unwrap-owner))))

(define-private (maxu (a uint) (b uint))
  (if (> a b) a b))

(define-private (calc-referral-price (base uint) (referrer (optional principal)))
  (if (and (is-some referrer) (not (is-eq tx-sender (unwrap! referrer (err u400)))))
      (- base (/ (* base (var-get referral-discount-bps)) BASIS))
      base))

(define-private (split-and-transfer (amount uint))
  (begin
    (asserts! (> amount u0) err-invalid-amount)
    (let
      (
        (owner (unwrap-owner))
        (vault (unwrap-vault-or-owner))
        (owner-share (/ (* amount (var-get fee-split-bps)) BASIS))
        (vault-share (- amount (/ (* amount (var-get fee-split-bps)) BASIS)))
      )
      (try! (stx-transfer? owner-share tx-sender owner))
      (try! (stx-transfer? vault-share tx-sender (unwrap! vault err-owner-unset)))
      (ok true))))

(define-private (set-pass (user principal) (maybe-ref (optional principal)) (extra-duration uint))
  (let
    (
      (now block-height)
      (current (map-get? passes user))
      (current-exp (match current data (get expires-at data) u0))
      (uses (match current data (get total-uses data) u0))
      (referrer
        (match current data
          (or (get referrer data) maybe-ref)
          maybe-ref))
      (start (maxu current-exp now))
      (new-exp (+ start extra-duration))
    )
    (map-set passes user
      {
        expires-at: new-exp,
        total-uses: uses,
        referrer: referrer
      })
    new-exp))

(define-private (pass-active? (user principal))
  (match (map-get? passes user)
    data (>= (get expires-at data) block-height)
    false))

;; ========== public entrypoints ==========

;; One-time bootstrap to set owner and vault.
(define-public (bootstrap (admin principal) (vault principal))
  (begin
    (asserts! (is-none (var-get owner)) err-owner-set)
    (var-set owner (some admin))
    (var-set community-vault (some vault))
    (ok true)))

(define-public (set-params
    (new-price uint)
    (new-usage-fee uint)
    (new-fee-split-bps uint)
    (new-referral-discount-bps uint)
    (new-duration-blocks uint)
    (new-vault principal))
  (begin
    (try! (owner-guard))
    (asserts! (<= new-fee-split-bps BASIS) err-invalid-amount)
    (asserts! (< new-referral-discount-bps BASIS) err-invalid-amount)
    (var-set pass-price new-price)
    (var-set usage-fee new-usage-fee)
    (var-set fee-split-bps new-fee-split-bps)
    (var-set referral-discount-bps new-referral-discount-bps)
    (var-set pass-duration-blocks new-duration-blocks)
    (var-set community-vault (some new-vault))
    (ok true)))

(define-public (buy-pass (maybe-referrer (optional principal)))
  (let
    (
      (price (calc-referral-price (var-get pass-price) maybe-referrer))
      (new-exp (set-pass tx-sender maybe-referrer (var-get pass-duration-blocks)))
    )
    (try! (split-and-transfer price))
    (print {event: "pass-purchased", user: tx-sender, expires-at: new-exp, price: price})
    (ok new-exp)))

(define-public (renew-pass)
  (let
    (
      (current (map-get? passes tx-sender))
    )
    (match current
      data
        (let
          (
            (ref (get referrer data))
            (price (calc-referral-price (var-get pass-price) ref))
            (new-exp (set-pass tx-sender ref (var-get pass-duration-blocks)))
          )
          (try! (split-and-transfer price))
          (print {event: "pass-renewed", user: tx-sender, expires-at: new-exp, price: price})
          (ok new-exp))
      err-pass-missing)))

(define-public (use-pass)
  (match (map-get? passes tx-sender)
    data
      (begin
        (asserts! (>= (get expires-at data) block-height) err-pass-expired)
        (try! (split-and-transfer (var-get usage-fee)))
        (map-set passes tx-sender
          {
            expires-at: (get expires-at data),
            total-uses: (+ (get total-uses data) u1),
            referrer: (get referrer data)
          })
        (print {event: "pass-used", user: tx-sender, at: block-height})
        (ok true))
    err-pass-missing))

;; ========== read-only views ==========

(define-read-only (get-pass (user principal))
  (map-get? passes user))

(define-read-only (is-active (user principal))
  (pass-active? user))

(define-read-only (get-config)
  {
    owner: (var-get owner),
    community-vault: (var-get community-vault),
    pass-price: (var-get pass-price),
    usage-fee: (var-get usage-fee),
    fee-split-bps: (var-get fee-split-bps),
    referral-discount-bps: (var-get referral-discount-bps),
    pass-duration-blocks: (var-get pass-duration-blocks)
  })

;; TODO: add explicit Clarity 4-only built-ins once finalized for deployment
;; (e.g., diagnostics helpers). Keep contract valid on older tooling until then.

