import { Wallet, Pencil } from 'lucide-react'

import { useWallet } from '../context/WalletContext'

function WalletButton () {
  const { account, isConnected, connectWallet, walletName, renameWallet } =
    useWallet()

  const shortenAddress = address => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className='wallet-container'>
      {isConnected && (
        <button onClick={renameWallet} className='wallet-rename-button hidden lg:flex'>
          <Pencil className='w-4 h-4' />
        </button>
      )}

      <button onClick={connectWallet} className='wallet-connect-button'>
        {isConnected ? (
          <>
            <div className='wallet-status-dot'></div>

            <div className='wallet-info'>
              <span className='wallet-label'>Connected Wallet</span>

              <span className='wallet-address'>
                {walletName
                  ? `${walletName}`
                  : shortenAddress(account)}
              </span>
            </div>
          </>
        ) : (
          <>
            <Wallet className='w-5 h-5' />

            <span>Connect Wallet</span>
          </>
        )}
      </button>
    </div>
  )
}

export default WalletButton
