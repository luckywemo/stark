'use client'

import { useState, useEffect } from 'react'
import { useConnect } from '@stacks/connect-react'
import { StacksMainnet, StacksTestnet } from '@stacks/network'
import { 
  contractPrincipalCV, 
  someCV, 
  noneCV,
  uintCV,
  standardPrincipalCV,
  ClarityType
} from '@stacks/transactions'

// Contract address - update after deployment
// Can also be set via NEXT_PUBLIC_CONTRACT_ADDRESS env variable
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.pass-manager'
const NETWORK = (process.env.NEXT_PUBLIC_NETWORK === 'mainnet') 
  ? new StacksMainnet() 
  : new StacksTestnet()

interface PassData {
  expiresAt: number
  totalUses: number
  referrer: string | null
}

interface Config {
  owner: string | null
  communityVault: string | null
  passPrice: number
  usageFee: number
  feeSplitBps: number
  referralDiscountBps: number
  passDurationBlocks: number
}

export default function Home() {
  const { isSignedIn, userSession, doContractCall } = useConnect()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null)
  const [passData, setPassData] = useState<PassData | null>(null)
  const [config, setConfig] = useState<Config | null>(null)
  const [referrer, setReferrer] = useState('')
  const [isActive, setIsActive] = useState(false)

  const userAddress = userSession?.loadUserData()?.profile?.stxAddress?.testnet

  useEffect(() => {
    if (isSignedIn && userAddress) {
      fetchPassData()
      fetchConfig()
    }
  }, [isSignedIn, userAddress])

  const showMessage = (type: 'success' | 'error' | 'info', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 5000)
  }

  const fetchPassData = async () => {
    if (!userAddress) return
    
    try {
      const response = await fetch(
        `${NETWORK.coreApiUrl}/v2/contracts/call-read/${CONTRACT_ADDRESS}/get-pass`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sender: userAddress,
            arguments: [
              {
                type: 'principal',
                value: userAddress
              }
            ]
          })
        }
      )
      
      const data = await response.json()
      if (data.result && data.result.repr !== 'none') {
        // Parse the pass data
        const result = data.result.value
        setPassData({
          expiresAt: parseInt(result['expires-at'].value),
          totalUses: parseInt(result['total-uses'].value),
          referrer: result.referrer?.value?.repr || null
        })
      } else {
        setPassData(null)
      }

      // Check if active
      const activeResponse = await fetch(
        `${NETWORK.coreApiUrl}/v2/contracts/call-read/${CONTRACT_ADDRESS}/is-active`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sender: userAddress,
            arguments: [
              {
                type: 'principal',
                value: userAddress
              }
            ]
          })
        }
      )
      const activeData = await activeResponse.json()
      setIsActive(activeData.result?.value === 'true')
    } catch (error) {
      console.error('Error fetching pass data:', error)
    }
  }

  const fetchConfig = async () => {
    try {
      const response = await fetch(
        `${NETWORK.coreApiUrl}/v2/contracts/call-read/${CONTRACT_ADDRESS}/get-config`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sender: CONTRACT_ADDRESS,
            arguments: []
          })
        }
      )
      
      const data = await response.json()
      if (data.result?.value) {
        const cfg = data.result.value
        setConfig({
          owner: cfg.owner?.value?.repr || null,
          communityVault: cfg['community-vault']?.value?.repr || null,
          passPrice: parseInt(cfg['pass-price'].value),
          usageFee: parseInt(cfg['usage-fee'].value),
          feeSplitBps: parseInt(cfg['fee-split-bps'].value),
          referralDiscountBps: parseInt(cfg['referral-discount-bps'].value),
          passDurationBlocks: parseInt(cfg['pass-duration-blocks'].value)
        })
      }
    } catch (error) {
      console.error('Error fetching config:', error)
    }
  }

  const handleBuyPass = async () => {
    if (!isSignedIn || !userAddress) {
      showMessage('error', 'Please connect your wallet first')
      return
    }

    setLoading(true)
    try {
      const referrerArg = referrer.trim() 
        ? someCV(standardPrincipalCV(referrer.trim()))
        : noneCV()

      await doContractCall({
        contractAddress: CONTRACT_ADDRESS.split('.')[0],
        contractName: 'pass-manager',
        functionName: 'buy-pass',
        functionArgs: [referrerArg],
        network: NETWORK,
        onFinish: (data) => {
          showMessage('success', 'Pass purchased successfully!')
          setTimeout(() => fetchPassData(), 2000)
          setLoading(false)
        },
        onCancel: () => {
          showMessage('info', 'Transaction cancelled')
          setLoading(false)
        }
      })
    } catch (error: any) {
      showMessage('error', error.message || 'Failed to buy pass')
      setLoading(false)
    }
  }

  const handleRenewPass = async () => {
    if (!isSignedIn || !userAddress) {
      showMessage('error', 'Please connect your wallet first')
      return
    }

    setLoading(true)
    try {
      await doContractCall({
        contractAddress: CONTRACT_ADDRESS.split('.')[0],
        contractName: 'pass-manager',
        functionName: 'renew-pass',
        functionArgs: [],
        network: NETWORK,
        onFinish: (data) => {
          showMessage('success', 'Pass renewed successfully!')
          setTimeout(() => fetchPassData(), 2000)
          setLoading(false)
        },
        onCancel: () => {
          showMessage('info', 'Transaction cancelled')
          setLoading(false)
        }
      })
    } catch (error: any) {
      showMessage('error', error.message || 'Failed to renew pass')
      setLoading(false)
    }
  }

  const handleUsePass = async () => {
    if (!isSignedIn || !userAddress) {
      showMessage('error', 'Please connect your wallet first')
      return
    }

    setLoading(true)
    try {
      await doContractCall({
        contractAddress: CONTRACT_ADDRESS.split('.')[0],
        contractName: 'pass-manager',
        functionName: 'use-pass',
        functionArgs: [],
        network: NETWORK,
        onFinish: (data) => {
          showMessage('success', 'Pass used successfully!')
          setTimeout(() => fetchPassData(), 2000)
          setLoading(false)
        },
        onCancel: () => {
          showMessage('info', 'Transaction cancelled')
          setLoading(false)
        }
      })
    } catch (error: any) {
      showMessage('error', error.message || 'Failed to use pass')
      setLoading(false)
    }
  }

  const stxToMicroStx = (microStx: number) => (microStx / 1_000_000).toFixed(6)

  return (
    <div className="container" style={{ marginTop: 'var(--site-header-height)' }}>
      <div className="card">
        <h1>🎫 Pass Manager</h1>
        <p>Stacks Builder Challenge - Buy passes, generate fees, earn rewards</p>
        <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.5rem' }}>
          Contract: {CONTRACT_ADDRESS}
        </p>
      </div>

      {message && (
        <div className={`status ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="card">
        <h2>Wallet Connection</h2>
        {isSignedIn ? (
          <div>
            <p><strong>Connected:</strong> {userAddress}</p>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                userSession?.signUserOut()
                window.location.reload()
              }}
            >
              Disconnect
            </button>
          </div>
        ) : (
          <p>Please connect your Stacks wallet using the Connect button above</p>
        )}
      </div>

      {config && (
        <div className="card">
          <h2>Configuration</h2>
          <div className="info-grid">
            <div className="info-item">
              <strong>Pass Price</strong>
              {stxToMicroStx(config.passPrice)} STX
            </div>
            <div className="info-item">
              <strong>Usage Fee</strong>
              {stxToMicroStx(config.usageFee)} STX
            </div>
            <div className="info-item">
              <strong>Fee Split</strong>
              {config.feeSplitBps / 100}% owner
            </div>
            <div className="info-item">
              <strong>Referral Discount</strong>
              {config.referralDiscountBps / 100}%
            </div>
          </div>
        </div>
      )}

      {passData ? (
        <div className="card">
          <h2>Your Pass</h2>
          <div className="info-grid">
            <div className="info-item">
              <strong>Status</strong>
              {isActive ? '✅ Active' : '❌ Expired'}
            </div>
            <div className="info-item">
              <strong>Expires At</strong>
              Block {passData.expiresAt}
            </div>
            <div className="info-item">
              <strong>Total Uses</strong>
              {passData.totalUses}
            </div>
            {passData.referrer && (
              <div className="info-item">
                <strong>Referrer</strong>
                {passData.referrer}
              </div>
            )}
          </div>
          
          <div style={{ marginTop: '1rem' }}>
            <button 
              className="btn btn-secondary"
              onClick={handleRenewPass}
              disabled={loading}
            >
              {loading && <span className="loading"></span>}
              Renew Pass
            </button>
            <button 
              className="btn"
              onClick={handleUsePass}
              disabled={loading || !isActive}
            >
              {loading && <span className="loading"></span>}
              Use Pass
            </button>
          </div>
        </div>
      ) : (
        <div className="card">
          <h2>Buy Pass</h2>
          <p>Purchase a new pass to start using the service</p>
          
          <div style={{ marginTop: '1rem' }}>
            <label>
              Referrer (optional, get 5% discount):
              <input
                type="text"
                className="input"
                placeholder="ST1..."
                value={referrer}
                onChange={(e) => setReferrer(e.target.value)}
              />
            </label>
          </div>

          <button 
            className="btn"
            onClick={handleBuyPass}
            disabled={loading || !isSignedIn}
          >
            {loading && <span className="loading"></span>}
            Buy Pass ({config ? stxToMicroStx(config.passPrice) : '...'} STX)
          </button>
        </div>
      )}
    </div>
  )
}
