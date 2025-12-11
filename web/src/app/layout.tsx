import type { Metadata } from 'next'
import './globals.css'
import { ConnectWalletProvider } from '@/components/ConnectWallet'
import { ConnectButton } from '@/components/ConnectWallet'

export const metadata: Metadata = {
  title: 'Pass Manager - Stacks Builder Challenge',
  description: 'Buy passes, generate fees, earn rewards',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ConnectWalletProvider>
          <ConnectButton />
          {children}
        </ConnectWalletProvider>
      </body>
    </html>
  )
}
