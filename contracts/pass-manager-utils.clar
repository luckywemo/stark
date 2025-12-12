;; Utility contract for Pass Manager analytics and admin functions
;; Separated for modularity and to demonstrate contract composition

(define-constant contract-owner 'SP974PMENTVC61C8PAE8517T0MQ9FQ8ZRV9PNK01)
(define-constant pass-manager-contract 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.pass-manager)

(define-map analytics
  { event: (string-ascii 50), timestamp: uint }
  uint
)

(define-data-var total-passes-sold uint u0)
(define-data-var total-revenue uint u0)

(define-private (is-contract-owner)
  (is-eq tx-sender contract-owner))

(define-public (record-event (event-name (string-ascii 50)))
  (begin
    (map-set analytics
      {
        event: event-name,
        timestamp: block-height
      }
      (+ (default-to u0 (map-get? analytics
        {
          event: event-name,
          timestamp: block-height
        })) u1))
    (ok true)))

(define-read-only (get-event-count (event-name (string-ascii 50)) (timestamp uint))
  (default-to u0 (map-get? analytics { event: event-name, timestamp: timestamp })))

(define-read-only (get-total-passes-sold)
  (var-get total-passes-sold))

(define-read-only (get-total-revenue)
  (var-get total-revenue))

(define-public (increment-passes-sold)
  (begin
    (var-set total-passes-sold (+ (var-get total-passes-sold) u1))
    (ok true)))

(define-public (add-revenue (amount uint))
  (begin
    (var-set total-revenue (+ (var-get total-revenue) amount))
    (ok true)))

