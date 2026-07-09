import { useState } from 'react'

import { Copy, Check } from 'lucide-react'

import { useWallet } from '@/context/WalletContext'

import { Button } from '../ui/button'

function WalletInfoCard () {
  const { account, walletName } = useWallet()

  const [copied, setCopied] = useState(false)

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(account)

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='dashboard-stat-card'>
      <h2 className='text-2xl font-bold mb-6'>Wallet Information</h2>

      <div className='space-y-5'>
        <div>
          <p className='dashboard-stat-label'>Wallet Name</p>

          <p>{walletName || 'Unnamed Wallet'}</p>
        </div>

        <div>
          <p className='dashboard-stat-label'>Wallet Address</p>

          <p className='break-all'>{account}</p>
        </div>

        <Button onClick={copyAddress} variant='blue'>
          {copied ? (
            <>
              <Check className='w-4 h-4 mr-2' />
              Copied!
            </>
          ) : (
            <>
              <Copy className='w-4 h-4 mr-2' />
              Copy Address
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default WalletInfoCard
