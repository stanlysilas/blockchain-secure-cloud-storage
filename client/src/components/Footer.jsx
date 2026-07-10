import { ShieldCheck, Globe, Heart, Tag } from 'lucide-react'

import GitHubIcon from '../assets/GitHubIcon'

function Footer () {
  return (
    <footer className='mt-24 border-t border-white/10 bg-black/30 backdrop-blur-xl'>
      <div className='page-container py-10'>
        <div className='grid gap-8 md:grid-cols-3'>
          <div>
            <h3 className='text-xl font-bold mb-3'>
              Blockchain Secure Cloud Storage
            </h3>

            <p className='text-gray-400 leading-relaxed'>
              A decentralized cloud storage application demonstrating secure
              client-side AES encryption, Ethereum smart contracts, IPFS storage
              and MetaMask authentication.
            </p>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-3'>Technology Stack</h3>

            <ul className='space-y-2 text-gray-400'>
              <li>React + Vite</li>
              <li>Solidity + Hardhat</li>
              <li>Ethereum Sepolia</li>
              <li>IPFS + Pinata</li>
              <li>Express.js</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-3'>Project Information</h3>

            <div className='space-y-3 text-gray-400'>
              <div className='flex items-center gap-2'>
                <ShieldCheck className='w-4 h-4 text-blue-400' />
                <span>AES-256 File Encryption</span>
              </div>

              <div className='flex items-center gap-2'>
                <Globe className='w-4 h-4 text-blue-400' />
                <span>Ethereum Sepolia Test Network</span>
              </div>

              <div className='flex items-center gap-2'>
                <Tag className='w-4 h-4 text-blue-400' />
                <span>Version {__APP_VERSION__}</span>
              </div>

              <div className='flex items-center gap-2'>
                <GitHubIcon className='w-4 h-4 text-blue-400' />
                <a
                  href='https://github.com/stanlysilas/blockchain-secure-cloud-storage'
                  target='_blank'
                  rel='noreferrer'
                  className='hover:text-white transition-colors'
                >
                  Source Code
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-sm text-gray-500'>
            © 2026 Stanly Silas. All rights reserved.
          </p>

          <p className='flex items-center gap-2 text-sm text-gray-500'>
            Built with
            <Heart className='w-4 h-4 text-red-400 fill-red-400' />
            using React, Ethereum & IPFS
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
