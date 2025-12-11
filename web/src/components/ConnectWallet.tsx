'use client'

import { Connect, useConnect } from '@stacks/connect-react'
import { StacksTestnet } from '@stacks/network'

const network = new StacksTestnet()

export function ConnectWalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <Connect
      authOptions={{
        appDetails: {
          name: 'Pass Manager',
          icon: typeof window !== 'undefined' ? window.location.origin + '/icon.png' : '',
        },
        network,
        redirectTo: '/',
        onFinish: () => {
          if (typeof window !== 'undefined') {
            window.location.reload()
          }
        },
      }}
    >
      {children}
    </Connect>
  )
}

export function ConnectButton() {
  const { doOpenAuth, isSignedIn } = useConnect()

  if (isSignedIn) {
    return null
  }

  return (
    <button 
      className="btn"
      onClick={() => doOpenAuth()}
      style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000 }}
    >
      Connect Wallet
    </button>
  )
}

