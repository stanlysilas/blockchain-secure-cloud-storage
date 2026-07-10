import {
  ShieldCheck,
  LockKeyhole,
  Database,
  ArrowRight,
  Wallet,
  Monitor,
  KeyRound,
  HardDrive,
  FileCode2
} from 'lucide-react'

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
        <div className='chip hero-badge'>
          Secure Decentralized Cloud Storage
        </div>

        <h1 className='hero-title'>
          Store Files With
          <span className='hero-gradient-text'> Blockchain Security</span>
        </h1>

        <p className='hero-description'>
          Secure decentralized cloud storage powered by Ethereum smart
          contracts, client-side AES encryption, IPFS distributed storage, and
          MetaMask authentication.
        </p>

        <div className='flex flex-wrap justify-center gap-3 my-8'>
          <span className='chip'>
            <ShieldCheck className='w-4 h-4 mr-2' />
            Ethereum
          </span>

          <span className='chip'>
            <Database className='w-4 h-4 mr-2' />
            IPFS
          </span>

          <span className='chip'>
            <LockKeyhole className='w-4 h-4 mr-2' />
            AES-256
          </span>

          <span className='chip'>
            <Wallet className='w-4 h-4 mr-2' />
            MetaMask
          </span>
        </div>

        <div className='hero-button-group'>
          <Button variant='blue' onClick={handlePrimaryAction}>
            {isConnected ? 'Launch Dashboard' : 'Get Started'}

            <ArrowRight className='ml-2 w-5 h-5' />
          </Button>

          <Button
            variant='glass'
            onClick={() =>
              document
                .querySelector('#features')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Learn More
          </Button>
        </div>
      </section>

      <section id='features' className='section-spacing'>
        <div className='text-center mb-14'>
          <div className='chip hero-badge'>Core Features</div>

          <h2 className='section-title'>
            Features of <span className='hero-gradient-text'>BlockDrive</span>
          </h2>

          <p className='section-description'>
            Explore the core technologies that power BlockDrive, from Ethereum
            smart contracts and AES encryption to decentralized IPFS storage and
            secure permission management.
          </p>
        </div>
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

      <section className='section-spacing'>
        <div className='text-center mb-14'>
          <div className='chip hero-badge'>System Architecture</div>

          <h2 className='section-title'>
            How <span className='hero-gradient-text'>BlockDrive</span> Works
          </h2>

          <p className='section-description'>
            Every file follows a secure decentralized pipeline from encryption
            to blockchain ownership verification.
          </p>
        </div>

        <div className='architecture-grid'>
          <div className='architecture-card'>
            <Monitor className='architecture-icon' />

            <h3 className='architecture-title'>Browser</h3>

            <p className='architecture-description'>
              User selects a file and provides an encryption password.
            </p>
          </div>

          <ArrowRight className='architecture-arrow' />

          <div className='architecture-card'>
            <KeyRound className='architecture-icon' />

            <h3 className='architecture-title'>AES Encryption</h3>

            <p className='architecture-description'>
              Files are encrypted locally before leaving the browser.
            </p>
          </div>

          <ArrowRight className='architecture-arrow' />

          <div className='architecture-card'>
            <HardDrive className='architecture-icon' />

            <h3 className='architecture-title'>IPFS Storage</h3>

            <p className='architecture-description'>
              The encrypted file is uploaded to IPFS through Pinata.
            </p>
          </div>

          <ArrowRight className='architecture-arrow' />

          <div className='architecture-card'>
            <FileCode2 className='architecture-icon' />

            <h3 className='architecture-title'>Smart Contract</h3>

            <p className='architecture-description'>
              Ownership and sharing permissions are stored on Ethereum Sepolia.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
