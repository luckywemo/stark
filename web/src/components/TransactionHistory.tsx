'use client'

import { useState, useEffect } from 'react'
import type { ContractEvent } from '@/types/contract'

interface TransactionHistoryProps {
  contractAddress: string
  userAddress?: string
}

export function TransactionHistory({ contractAddress, userAddress }: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!userAddress) return

    const fetchTransactions = async () => {
      setLoading(true)
      try {
        // TODO: Implement actual transaction fetching from Stacks API
        // For now, this is a placeholder
        const response = await fetch(
          `https://api.testnet.hiro.so/extended/v1/address/${userAddress}/transactions?limit=10`
        )
        const data = await response.json()
        
        // Filter for contract-related transactions
        const contractTxs = data.results?.filter((tx: any) =>
          tx.tx_type === 'contract_call' &&
          tx.contract_call?.contract_id === contractAddress
        ) || []
        
        setTransactions(contractTxs)
      } catch (error) {
        console.error('Error fetching transactions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [userAddress, contractAddress])

  if (!userAddress) {
    return (
      <div className="card">
        <h2>Transaction History</h2>
        <p>Connect your wallet to view transaction history</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="card">
        <h2>Transaction History</h2>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>📜 Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet. Start by purchasing a pass!</p>
      ) : (
        <div style={{ marginTop: '1rem' }}>
          {transactions.map((tx, idx) => (
            <div
              key={tx.tx_id || idx}
              style={{
                padding: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                marginBottom: '0.5rem',
                fontSize: '0.9rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>
                  <strong>{tx.contract_call?.function_name || 'Unknown'}</strong>
                </span>
                <a
                  href={`https://explorer.stacks.co/txid/${tx.tx_id}?chain=testnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#667eea', textDecoration: 'none', fontSize: '0.85rem' }}
                >
                  View →
                </a>
              </div>
              <div style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.85rem' }}>
                {new Date(tx.burn_block_time * 1000).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}




