import { Lock, Shield, Database, Wallet } from 'lucide-react'
import { useWallet } from '@/context/WalletContext'

function SecurityCard () {
  const { network } = useWallet()
  const getNetworkName = () => {
    if (!network) return 'Unknown'

    switch (Number(network.chainId)) {
      case 31337:
        return 'Hardhat Local'

      case 11155111:
        return 'Ethereum Sepolia'

      case 1:
        return 'Ethereum Mainnet'

      default:
        return network.name
    }
  }

  const items = [
    {
      icon: <Lock className='w-5 h-5 text-blue-400' />,
      title: 'Encryption',
      value: 'AES-256'
    },

    {
      icon: <Shield className='w-5 h-5 text-blue-400' />,
      title: 'Authentication',
      value: 'MetaMask'
    },

    {
      icon: <Database className='w-5 h-5 text-blue-400' />,
      title: 'Storage',
      value: 'IPFS'
    },

    {
      icon: <Wallet className='w-5 h-5 text-blue-400' />,
      title: 'Network',
      value: getNetworkName()
    }
  ]

  return (
    <div className='dashboard-stat-card'>
      <h2 className='text-2xl font-bold mb-6'>Security</h2>

      <div className='space-y-5'>
        {items.map(item => (
          <div key={item.title} className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              {item.icon}

              <span>{item.title}</span>
            </div>

            <span className='text-gray-400'>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SecurityCard
