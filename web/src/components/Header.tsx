'use client'

import { useConnect } from '@stacks/connect-react'
import { ConnectButton } from './ConnectWallet'

export function Header() {
  const { isSignedIn, userSession } = useConnect()
  const userAddress = userSession?.loadUserData()?.profile?.stxAddress?.testnet

  return (
    <header style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        <div>
          <h1 style={{ 
            margin: 0, 
            color: 'white', 
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            🎫 Pass Manager
          </h1>
          <p style={{ 
            margin: 0, 
            color: 'rgba(255,255,255,0.9)', 
            fontSize: '0.85rem',
            marginTop: '0.25rem'
          }}>
            Stacks Builder Challenge
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {isSignedIn && userAddress && (
            <div style={{ 
              color: 'white', 
              fontSize: '0.9rem',
              background: 'rgba(255,255,255,0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '6px'
            }}>
              {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
            </div>
          )}
          <ConnectButton />
        </div>
      </div>
    </header>
  )
}
