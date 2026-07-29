import { useEffect, useState } from 'react'

import { ShieldCheck, Download, FileText, Inbox, Users } from 'lucide-react'

import FileItem from '@/components/FileItem'

import { getContract } from '@/services/contractService'

function SharedFiles () {
  const [sharedFiles, setSharedFiles] = useState([])
  const [mySharedFiles, setMySharedFiles] = useState([])

  const [loading, setLoading] = useState(true)

  const [receivedSearch, setReceivedSearch] = useState('')
  const [sharedSearch, setSharedSearch] = useState('')

  const deleteFile = async fileId => {
    try {
      const contract = await getContract()

      const tx = await contract.deleteFile(fileId)

      await tx.wait()

      await fetchData()
    } catch (error) {
      console.error(error)
    }
  }

  const shareFile = async (fileId, address) => {
    const contract = await getContract()

    const tx = await contract.shareAccess(fileId, address)

    await tx.wait()

    await fetchData()
  }

  const fetchData = async () => {
    try {
      const contract = await getContract()

      const receivedFiles = (await contract.getSharedFiles()).map(file => ({
        id: file.id,
        fileName: file.fileName,
        ipfsHash: file.ipfsHash,
        owner: file.owner,
        timestamp: file.timestamp
      }))

      setSharedFiles(receivedFiles)

      const myFiles = (await contract.getMyFiles()).map(file => ({
        id: file.id,
        fileName: file.fileName,
        ipfsHash: file.ipfsHash,
        owner: file.owner,
        timestamp: file.timestamp
      }))

      const filesWithUsers = await Promise.all(
        myFiles.map(async file => {
          const users = await contract.getSharedUsers(file.id)

          return {
            ...file,
            users
          }
        })
      )

      setMySharedFiles(filesWithUsers)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

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

        <h2 className='empty-title'>Loading Sharing Center</h2>

        <p className='empty-description'>
          Fetching your shared files from blockchain...
        </p>
      </div>
    )
  }

  const filteredReceivedFiles = sharedFiles.filter(file => {
    const query = receivedSearch.toLowerCase()

    return (
      file.fileName.toLowerCase().includes(query) ||
      file.owner.toLowerCase().includes(query) ||
      file.id.toString().includes(query)
    )
  })

  const filteredMySharedFiles = mySharedFiles.filter(file => {
    const query = sharedSearch.toLowerCase()

    return (
      file.fileName.toLowerCase().includes(query) ||
      file.id.toString().includes(query) ||
      file.users.some(user => user.toLowerCase().includes(query))
    )
  })

  return (
    <div className='page-container'>
      <div className='dashboard-header'>
        <div>
          <h1 className='dashboard-title'>Sharing Center</h1>

          <p className='dashboard-subtitle'>
            Manage files shared with you and files you have shared with others.
          </p>
        </div>
      </div>

      <div className='space-y-14'>
        <section>
          <div className='mb-8'>
            <div className='flex items-center gap-3'>
              <Download className='w-7 h-7 text-blue-400' />
              <h2 className='text-3xl font-bold'>Shared With Me</h2>
            </div>

            <input
              type='text'
              placeholder='Search by file name, owner or File ID...'
              value={receivedSearch}
              onChange={e => setReceivedSearch(e.target.value)}
              className='input-field max-w-xl mt-6 mb-8'
            />
          </div>

          {sharedFiles.length === 0 ? (
            <div className='dashboard-shell text-center py-16'>
              <Inbox className='w-14 h-14 mx-auto text-blue-400 mb-6' />

              <h3 className='text-2xl font-bold mb-3'>No Shared Files</h3>

              <p className='text-gray-400'>
                Files shared with your wallet will automatically appear here.
              </p>
            </div>
          ) : (
            <div className='file-grid'>
              {filteredReceivedFiles.map(file => (
                <FileItem
                  key={file.id.toString()}
                  file={file}
                  mode='received'
                  revokeAccess={revokeAccess}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <div className='mb-8'>
            <div className='flex items-center gap-3'>
              <Users className='w-7 h-7 text-blue-400' />
              <h2 className='text-3xl font-bold'>Shared By Me</h2>
            </div>

            <input
              type='text'
              placeholder='Search by file name, recipient or File ID...'
              value={sharedSearch}
              onChange={e => setSharedSearch(e.target.value)}
              className='input-field max-w-xl mt-6 mb-8'
            />
          </div>

          {mySharedFiles.length === 0 ? (
            <div className='dashboard-shell text-center py-16'>
              <Inbox className='w-14 h-14 mx-auto text-blue-400 mb-6' />

              <h3 className='text-2xl font-bold mb-3'>No Shared Files</h3>

              <p className='text-gray-400'>
                Share access to your uploaded files with other wallets, and
                they'll be listed here.
              </p>
            </div>
          ) : (
            <div className='file-grid'>
              {filteredMySharedFiles.map(file => (
                <FileItem
                  key={file.id.toString()}
                  file={file}
                  mode='shared'
                  shareFile={shareFile}
                  deleteFile={deleteFile}
                  revokeAccess={revokeAccess}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default SharedFiles
