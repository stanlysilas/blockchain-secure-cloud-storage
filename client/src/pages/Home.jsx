import { ShieldCheck, LockKeyhole, Database, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useNavigate } from 'react-router-dom'

import { useWallet } from '../context/WalletContext'

function Home () {
  const navigate = useNavigate()

  const { isConnected, connectWallet } = useWallet()

  const handlePrimaryAction = async () => {
    if (isConnected) {
      navigate('/dashboard')
    } else {
      await connectWallet()
    }
  }

  return (
    <div className='page-container'>
      <section className='hero-section'>
        <div className='hero-badge'>Secure Decentralized Cloud Storage</div>

        <h1 className='hero-title'>
          Store Files With
          <span className='hero-gradient-text'> Blockchain Security</span>
        </h1>

        <p className='hero-description'>
          A next-generation decentralized storage platform powered by Ethereum
          smart contracts, AES encryption, IPFS distributed storage, and
          MetaMask authentication.
        </p>

        <div className='hero-button-group'>
          <Button variant='blue' onClick={handlePrimaryAction}>
            {isConnected ? 'Launch Dashboard' : 'Get Started'}

            <ArrowRight className='ml-2 w-5 h-5' />
          </Button>

          <Button variant='glass' onClick={() => navigate('/upload')}>
            Explore Platform
          </Button>
        </div>
      </section>

      <section className='section-spacing'>
        <div className='feature-grid'>
          <div className='feature-card'>
            <ShieldCheck className='feature-icon' />

            <h2 className='feature-title'>Smart Contract Security</h2>

            <p className='feature-description'>
              Ethereum smart contracts securely manage ownership, metadata, and
              decentralized access permissions.
            </p>
          </div>

          <div className='feature-card'>
            <LockKeyhole className='feature-icon' />

            <h2 className='feature-title'>AES File Encryption</h2>

            <p className='feature-description'>
              Files are encrypted locally before upload, ensuring complete
              confidentiality in decentralized storage.
            </p>
          </div>

          <div className='feature-card'>
            <Database className='feature-icon' />

            <h2 className='feature-title'>IPFS Distributed Storage</h2>

            <p className='feature-description'>
              Distributed decentralized storage powered by IPFS and persistent
              Pinata pinning infrastructure.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
