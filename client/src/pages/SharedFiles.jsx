import { useEffect, useState } from 'react'

import { ShieldCheck, Download, FileText, Inbox, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { getContract } from '@/services/contractService'

import { downloadAndDecryptFile } from '@/services/downloadService'

function SharedFiles () {
  const [sharedFiles, setSharedFiles] = useState([])

  const [mySharedFiles, setMySharedFiles] = useState([])

  const [loading, setLoading] = useState(true)

  const [downloading, setDownloading] = useState(false)

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
          <div className='flex items-center gap-3 mb-6'>
            <Download className='w-7 h-7 text-blue-400' />

            <h2 className='text-3xl font-bold'>Shared With Me</h2>
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
              {sharedFiles.map(file => (
                <div key={file.id.toString()} className='file-card'>
                  <div className='file-card-header'>
                    <div className='file-icon-wrapper'>
                      <FileText className='w-7 h-7 text-blue-400' />
                    </div>

                    <div className='bg-green-500/10 border border-green-500/20 text-green-300 text-xs px-3 py-1 rounded-full'>
                      Shared
                    </div>
                  </div>

                  <div className='file-meta'>
                    <div>
                      <p className='file-meta-label'>File Name</p>

                      <p className='file-meta-value'>{file.fileName}</p>
                    </div>

                    <div>
                      <p className='file-meta-label'>Owner</p>

                      <p className='file-meta-value'>{file.owner}</p>
                    </div>

                    <div>
                      <p className='file-meta-label'>IPFS Hash</p>

                      <p className='file-meta-value'>{file.ipfsHash}</p>
                    </div>
                  </div>

                  <div className='file-action-group'>
                    <Button
                      variant={downloading ? 'glass' : 'blue'}
                      size='full'
                      disabled={downloading}
                      onClick={async () => {
                        setDownloading(true)

                        try {
                          await downloadAndDecryptFile(
                            file.ipfsHash,
                            file.fileName
                          )
                        } finally {
                          setDownloading(false)
                        }
                      }}
                    >
                      <Download className='w-4 h-4 mr-2' />

                      {downloading ? 'Decrypting...' : 'Download'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className='flex items-center gap-3 mb-6'>
            <Users className='w-7 h-7 text-purple-400' />

            <h2 className='text-3xl font-bold'>Shared By Me</h2>
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
              {mySharedFiles.map(file => (
                <div key={file.id.toString()} className='file-card'>
                  <div className='file-card-header'>
                    <div className='file-icon-wrapper'>
                      <FileText className='w-7 h-7 text-blue-400' />
                    </div>

                    <div className='bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs px-3 py-1 rounded-full'>
                      {file.users.length} Shared
                    </div>
                  </div>

                  <div className='file-meta'>
                    <div>
                      <p className='file-meta-label'>File Name</p>

                      <p className='file-meta-value'>{file.fileName}</p>
                    </div>

                    <div>
                      <p className='file-meta-label'>Shared With</p>

                      {file.users.length === 0 ? (
                        <p className='text-gray-500'>Not shared yet</p>
                      ) : (
                        <div className='space-y-2 mt-2'>
                          {file.users.map(user => (
                            <div
                              key={user}
                              className='bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm break-all'
                            >
                              {user}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='file-action-group'>
                    <Button
                      variant='blue'
                      size='full'
                      onClick={() =>
                        downloadAndDecryptFile(file.ipfsHash, file.fileName)
                      }
                    >
                      <Download className='w-4 h-4 mr-2' />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default SharedFiles
