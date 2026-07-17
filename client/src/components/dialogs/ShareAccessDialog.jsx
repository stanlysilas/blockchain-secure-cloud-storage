import { useState } from 'react'

import { X, Share2, Wallet, LoaderCircle } from 'lucide-react'

import FileIcon from '@/components/ui/FileIcon'

import { Button } from '@/components/ui/button'

import { isAddress } from 'ethers'

function ShareAccessDialog ({ open, onClose, file, onShare }) {
  const [address, setAddress] = useState('')
  const [sharing, setSharing] = useState(false)
  const [error, setError] = useState('')

  if (!open || !file) return null

  const submit = async () => {
    setError('')
    if (!address.trim()) {
      alert('Please enter a wallet address.')
      return
    }

    if (!isAddress(address)) {
      alert('Please enter a valid Ethereum wallet address.')
      return
    }

    setSharing(true)

    try {
      await onShare(file.id, address)

      setAddress('')

      onClose()
    } catch (error) {
      setError(
        error.reason ??
          error.revert?.args?.[0] ??
          error.shortMessage ??
          error.message ??
          'Failed to share file.'
      )
    } finally {
      setSharing(false)
    }
  }

  return (
    <div className='dialog-overlay' onClick={onClose}>
      <div className='share-dialog' onClick={e => e.stopPropagation()}>
        <div className='dialog-header'>
          <div className='flex items-center gap-4'>
            <FileIcon fileName={file.fileName} />

            <div>
              <h2 className='dialog-title'>Share File</h2>

              <p className='dialog-subtitle'>{file.fileName}</p>
            </div>
          </div>

          <Button variant='ghost' size='icon' onClick={onClose}>
            <X className='w-5 h-5' />
          </Button>
        </div>

        <div className='dialog-section'>
          <label className='dialog-label'>Wallet Address</label>

          <div className='dialog-input-wrapper'>
            <Wallet className='w-5 h-5 text-gray-400' />

            <input
              className='dialog-input'
              placeholder='0x...'
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>

          <p className='dialog-hint'>
            The recipient will receive permission to access this file through
            the smart contract. They must also know the encryption password to
            decrypt the file after downloading.
          </p>

          {error && <div className='decrypt-error'>{error}</div>}
        </div>

        <div className='dialog-footer'>
          <Button
            variant='glass'
            size='full'
            onClick={onClose}
            disabled={sharing}
          >
            Cancel
          </Button>

          <Button
            variant='blue'
            size='full'
            disabled={sharing}
            onClick={submit}
          >
            {sharing ? (
              <>
                <LoaderCircle className='w-4 h-4 mr-2 animate-spin' />
                Sharing...
              </>
            ) : (
              <>
                <Share2 className='w-4 h-4 mr-2' />
                Share Access
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ShareAccessDialog
