import { useEffect, useRef, useState } from 'react'

import {
  LockKeyhole,
  LoaderCircle,
  CheckCircle2,
  CircleAlert,
  X
} from 'lucide-react'

import { Button } from '@/components/ui/button'

function DecryptionDialog ({ open, loading, error, onClose, onDecrypt }) {
  const [password, setPassword] = useState('')

  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setPassword('')

      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  if (!open) return null

  return (
    <div className='dialog-overlay' onClick={!loading ? onClose : undefined}>
      <div className='decrypt-dialog' onClick={e => e.stopPropagation()}>
        <div className='dialog-header'>
          <div>
            <h2 className='dialog-title'>Decrypt File</h2>

            <p className='dialog-subtitle'>
              Enter the encryption password to continue.
            </p>
          </div>

          {!loading && (
            <Button variant='ghost' size='icon' onClick={onClose}>
              <X className='w-5 h-5' />
            </Button>
          )}
        </div>

        <div className='decrypt-icon'>
          {loading ? (
            <LoaderCircle className='w-14 h-14 animate-spin text-blue-400' />
          ) : error ? (
            <CircleAlert className='w-14 h-14 text-red-400' />
          ) : (
            <LockKeyhole className='w-14 h-14 text-blue-400' />
          )}
        </div>

        {!loading && (
          <>
            <input
              ref={inputRef}
              type='password'
              className='input-field mt-6'
              placeholder='Encryption Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && password.trim()) {
                  onDecrypt(password)
                }
              }}
            />

            {error && (
              <div className='decrypt-error'>
                <CircleAlert className='w-4 h-4' />

                <span>{error}</span>
              </div>
            )}
          </>
        )}

        {loading && (
          <div className='decrypt-loading'>
            <p className='text-lg font-semibold'>Decrypting...</p>

            <p className='text-gray-400'>
              Downloading the encrypted file and securely decrypting it inside
              your browser.
            </p>
          </div>
        )}

        <div className='dialog-footer'>
          {!loading && (
            <>
              <Button variant='glass' size='full' onClick={onClose}>
                Cancel
              </Button>

              <Button
                variant='blue'
                size='full'
                disabled={!password.trim()}
                onClick={() => onDecrypt(password)}
              >
                <CheckCircle2 className='w-4 h-4 mr-2' />
                Decrypt
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default DecryptionDialog
