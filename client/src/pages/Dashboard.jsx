import { useEffect, useState } from 'react'

import { ShieldCheck } from 'lucide-react'

import { getContract } from '../services/contractService'

import FileCard
from '@/components/FileCard'

function Dashboard () {
  const [files, setFiles] = useState([])

  const [loading, setLoading] = useState(true)

  const shareFile = async (fileId, address) => {
    try {
      const contract = await getContract()

      const transaction = await contract.shareAccess(fileId, address)

      await transaction.wait()

      alert('Access shared successfully')

    } catch (error) {
      console.error(error)

      alert(error.reason || error.shortMessage || 'Failed to share access.')
    }
  }

  const fetchFiles = async () => {
    try {
      const contract = await getContract()

      const data = await contract.getMyFiles()

      setFiles(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  if (loading) {
    return (
      <div className='empty-state'>
        <ShieldCheck className='w-16 h-16 text-blue-400 animate-pulse' />

        <h2 className='empty-title'>Loading Secure Files</h2>

        <p className='empty-description'>
          Fetching encrypted decentralized storage metadata from blockchain.
        </p>
      </div>
    )
  }

  if (files.length === 0) {
    return (
      <div className='page-container'>
        <div className='dashboard-layout'>
          <div className='dashboard-wrapper'>
            <div className='dashboard-shell'>
              <div className='dashboard-topbar'>
                <div>
                  <h1 className='dashboard-title'>Storage Dashboard</h1>

                  <p className='dashboard-subtitle'>
                    Manage encrypted decentralized files stored securely on
                    blockchain and IPFS.
                  </p>
                </div>
              </div>

              <div className='dashboard-stat-grid'>
                <div className='dashboard-stat-card'>
                  <p className='dashboard-stat-label'>Total Files</p>

                  <h2 className='dashboard-stat-value'>{files.length}</h2>
                </div>

                <div className='dashboard-stat-card'>
                  <p className='dashboard-stat-label'>Encryption</p>

                  <h2 className='dashboard-stat-value'>AES-256</h2>
                </div>

                <div className='dashboard-stat-card'>
                  <p className='dashboard-stat-label'>Storage Network</p>

                  <h2 className='dashboard-stat-value'>IPFS</h2>
                </div>
              </div>

              <div className='file-grid mt-10'>
                {files.map(file => (
                  <FileCard
                    key={file.id.toString()}
                    file={file}
                    shareFile={shareFile}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='page-container'>
      <div className='dashboard-header'>
        <div>
          <h1 className='dashboard-title'>Storage Dashboard</h1>

          <p className='dashboard-subtitle'>
            Manage encrypted decentralized files stored on blockchain and IPFS.
          </p>
        </div>
      </div>

      <div className='file-grid'>
        {files.map(file => (
          <FileCard
            key={file.id.toString()}
            file={file}
            shareFile={shareFile}
          />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
