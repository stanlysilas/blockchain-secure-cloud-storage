import { ShieldCheck } from 'lucide-react'
import { useWallet } from '@/context/WalletContext'

function ProfileHeader () {
  const { account, walletName } = useWallet()

  const shortenAddress = address =>
    `${address.slice(0, 6)}...${address.slice(-4)}`

  return (
    <div className='dashboard-shell'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
        <div className='flex items-center gap-5'>
          <div className='upload-icon-wrapper'>
            <ShieldCheck className='w-10 h-10 text-blue-400' />
          </div>

          <div>
            <h1 className='dashboard-title'>
              {walletName || 'Wallet Profile'}
            </h1>

            <p className='dashboard-subtitle'>
              {account}
            </p>
          </div>
        </div>

        <div className='bg-green-500/10 border border-green-500/20 text-green-300 rounded-full px-4 py-2 text-sm font-medium'>
          Connected
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
