import { useEffect, useState } from 'react'

import { ShieldCheck, Search } from 'lucide-react'

import { getContract } from '../services/contractService'

import FileItem from '@/components/FileItem'

function Dashboard () {
  const [files, setFiles] = useState([])

  const [search, setSearch] = useState('')

  const [loading, setLoading] = useState(true)

  const shareFile = async (fileId, address) => {
    const contract = await getContract()

    const tx = await contract.shareAccess(fileId, address)

    await tx.wait()

    await fetchFiles()
  }

  const fetchFiles = async () => {
    try {
      const contract = await getContract()

      const data = await contract.getMyFiles()

      const filesWithUsers = await Promise.all(
        data.map(async file => {
          const users = await contract.getSharedUsers(file.id)

          return {
            id: file.id,
            fileName: file.fileName,
            ipfsHash: file.ipfsHash,
            owner: file.owner,
            timestamp: file.timestamp,
            deleted: file.deleted,
            users
          }
        })
      )

      setFiles(filesWithUsers)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  const filteredFiles = files.filter(file => {
    const query = search.toLowerCase()

    return (
      file.fileName.toLowerCase().includes(query) ||
      file.owner.toLowerCase().includes(query) ||
      file.id.toString().includes(query)
    )
  })

  const deleteFile = async fileId => {
    if (!confirm('Delete this file?')) return

    const contract = await getContract()

    const tx = await contract.deleteFile(fileId)

    await tx.wait()

    await fetchFiles()

    alert('File deleted successfully.')
  }

  const revokeAccess = async (fileId, address) => {
    const contract = await getContract()

    const tx = await contract.revokeAccess(fileId, address)

    await tx.wait()

    await fetchFiles()

    return true
  }

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
                {filteredFiles.map(file => (
                  <FileItem
                    key={file.id.toString()}
                    file={file}
                    shareFile={shareFile}
                    deleteFile={deleteFile}
                    revokeAccess={revokeAccess}
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

          <div className='relative mt-6 max-w-xl'>
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />

            <input
              type='text'
              placeholder='Search files...'
              value={search}
              onChange={e => setSearch(e.target.value)}
              className='input-field pl-12'
            />
          </div>
        </div>
      </div>

      <div className='file-grid'>
        {filteredFiles.map(file => (
          <FileItem
            key={file.id.toString()}
            file={file}
            shareFile={shareFile}
            deleteFile={deleteFile}
            revokeAccess={revokeAccess}
          />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
