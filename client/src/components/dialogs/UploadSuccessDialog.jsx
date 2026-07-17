import { CheckCircle2, UploadCloud, LayoutDashboard } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useNavigate } from 'react-router-dom'

function UploadSuccessDialog ({ open, onClose }) {
  const navigate = useNavigate()

  if (!open) return null

  return (
    <div className='dialog-overlay'>
      <div className='upload-success-dialog'>
        <div className='success-icon'>
          <CheckCircle2 className='w-14 h-14 text-green-400' />
        </div>

        <h2 className='dialog-title'>Upload Successful</h2>

        <p className='dialog-subtitle mt-3'>
          Your encrypted file has been securely uploaded to IPFS and its
          ownership has been recorded on the Ethereum blockchain.
        </p>

        <div className='success-checklist'>
          <div>✓ File encrypted locally (AES-256)</div>

          <div>✓ Uploaded to IPFS</div>

          <div>✓ Metadata stored on Ethereum</div>
        </div>

        <div className='dialog-footer flex-col'>
          <Button
            variant='blue'
            size='full'
            onClick={() => {
              onClose()
              navigate('/dashboard')
            }}
          >
            <LayoutDashboard className='w-4 h-4 mr-2' />
            Go to Dashboard
          </Button>

          <Button variant='glass' size='full' onClick={onClose}>
            <UploadCloud className='w-4 h-4 mr-2' />
            Upload Another File
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UploadSuccessDialog
