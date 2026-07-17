import {
  X,
  Copy,
  Check,
  ShieldCheck,
  Database,
  User,
  Users,
  UserMinus,
  LoaderCircle
} from 'lucide-react'

import { useState, useEffect } from 'react'

import FileIcon from '@/components/ui/FileIcon'

import { Button } from '@/components/ui/button'

function FileInformationDialog ({ open, onClose, file, onRevoke }) {
  const [users, setUsers] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [copiedField, setCopiedField] = useState(null)
  const [revoking, setRevoking] = useState(null)

  useEffect(() => {
    if (open && file) {
      setUsers(file.users || [])
      setSuccessMessage('')
      setRevoking(null)
    }
  }, [open, file])

  useEffect(() => {
    if (!successMessage) return

    const timer = setTimeout(() => {
      setSuccessMessage('')
    }, 3000)

    return () => clearTimeout(timer)
  }, [successMessage])

  if (!open || !file) return null

  const extension = file.fileName.split('.').pop()?.toUpperCase() || 'Unknown'

  const uploaded = new Date(Number(file.timestamp) * 1000)

  const copy = async (value, field) => {
    await navigator.clipboard.writeText(value)

    setCopiedField(field)

    setTimeout(() => {
      setCopiedField(null)
    }, 1500)
  }

  return (
    <div className='dialog-overlay' onClick={onClose}>
      <div className='file-info-dialog' onClick={e => e.stopPropagation()}>
        <div className='dialog-header'>
          <div className='flex items-center gap-4'>
            <FileIcon fileName={file.fileName} />

            <div>
              <h2 className='dialog-title'>{file.fileName}</h2>

              <p className='dialog-subtitle'>{extension} File</p>
            </div>
          </div>

          <Button variant='ghost' size='icon' onClick={onClose}>
            <X className='w-5 h-5' />
          </Button>
        </div>

        <div className='dialog-grid'>
          <div className='dialog-item'>
            <span className='dialog-label'>File ID</span>
            <span className='dialog-value'>{file.id.toString()}</span>
          </div>

          <div className='dialog-item'>
            <span className='dialog-label'>Extension</span>
            <span className='dialog-value'>{extension}</span>
          </div>

          <div className='dialog-item'>
            <span className='dialog-label'>Uploaded</span>
            <span className='dialog-value'>
              {uploaded.toLocaleDateString()}
            </span>
          </div>

          <div className='dialog-item'>
            <span className='dialog-label'>Time</span>
            <span className='dialog-value'>
              {uploaded.toLocaleTimeString()}
            </span>
          </div>
        </div>

        <div className='dialog-section'>
          <h3 className='dialog-section-title'>
            <ShieldCheck className='w-4 h-4 text-blue-400' />
            Security
          </h3>

          <div className='dialog-grid'>
            <div className='dialog-item'>
              <span className='dialog-label'>Encryption</span>
              <span className='dialog-value'>AES-256</span>
            </div>

            <div className='dialog-item'>
              <span className='dialog-label'>Storage</span>
              <span className='dialog-value'>IPFS (Pinata)</span>
            </div>

            <div className='dialog-item'>
              <span className='dialog-label'>Blockchain</span>
              <span className='dialog-value'>Ethereum Sepolia</span>
            </div>

            <div className='dialog-item'>
              <span className='dialog-label'>Access Control</span>
              <span className='dialog-value'>Smart Contract</span>
            </div>
          </div>
        </div>

        <div className='dialog-section'>
          <h3 className='dialog-section-title'>
            <User className='w-4 h-4 text-blue-400' />
            Owner
          </h3>

          <div className='dialog-copy-row'>
            <span className='dialog-copy-value'>{file.owner}</span>

            <Button
              variant={copiedField === 'owner' ? 'success' : 'ghost'}
              size='icon'
              onClick={() => copy(file.owner, 'owner')}
            >
              {copiedField === 'owner' ? (
                <Check className='w-4 h-4' />
              ) : (
                <Copy className='w-4 h-4' />
              )}
            </Button>
          </div>
        </div>

        {successMessage && (
          <div className='mb-4 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400'>
            {successMessage}
          </div>
        )}

        <div className='dialog-section'>
          <h3 className='dialog-section-title'>
            <Users className='w-4 h-4 text-blue-400' />
            Shared Access
          </h3>

          {users && users.length > 0 ? (
            <div className='space-y-2 mt-3'>
              {users.map(user => (
                <div key={user} className='dialog-copy-row'>
                  <span className='dialog-copy-value'>{user}</span>

                  <div className='flex items-center gap-2'>
                    <Button
                      variant={copiedField === 'shared' ? 'success' : 'ghost'}
                      size='icon'
                      onClick={() => copy(user, 'shared')}
                    >
                      {copiedField === 'shared' ? (
                        <Check className='w-4 h-4' />
                      ) : (
                        <Copy className='w-4 h-4' />
                      )}
                    </Button>

                    <Button
                      variant='ghost'
                      size='icon'
                      className='text-red-400 hover:bg-red-500/10'
                      disabled={revoking === user}
                      onClick={async () => {
                        try {
                          setRevoking(user)
                          setSuccessMessage('')

                          await onRevoke(file.id, user)

                          setUsers(prev =>
                            prev.filter(address => address !== user)
                          )

                          setSuccessMessage(
                            `Access revoked for ${user.slice(
                              0,
                              6
                            )}...${user.slice(-4)}`
                          )
                        } catch (err) {
                          console.error(err)

                          alert(
                            err.reason ??
                              err.shortMessage ??
                              err.message ??
                              'Failed to revoke access.'
                          )
                        } finally {
                          setRevoking(null)
                        }
                      }}
                    >
                      {revoking === user ? (
                        <LoaderCircle className='w-4 h-4 animate-spin' />
                      ) : (
                        <UserMinus className='w-4 h-4' />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-gray-400'>
              No wallets currently have shared access.
            </p>
          )}
        </div>

        <div className='dialog-section'>
          <h3 className='dialog-section-title'>
            <Database className='w-4 h-4 text-blue-400' />
            IPFS CID
          </h3>

          <div className='dialog-copy-row'>
            <span className='dialog-copy-value'>{file.ipfsHash}</span>

            <Button
              variant={copiedField === 'ipfs' ? 'success' : 'ghost'}
              size='icon'
              onClick={() => copy(file.ipfsHash, 'ipfs')}
            >
              {copiedField === 'ipfs' ? (
                <Check className='w-4 h-4' />
              ) : (
                <Copy className='w-4 h-4' />
              )}
            </Button>
          </div>
        </div>

        <div className='dialog-footer'>
          <Button variant='blue' size='full' onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FileInformationDialog
