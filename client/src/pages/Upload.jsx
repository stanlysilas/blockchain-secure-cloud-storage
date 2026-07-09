import { ShieldCheck } from 'lucide-react'

import UploadForm from '../components/UploadForm'

function Upload () {
  return (
    <div className='page-container'>
      <div className='upload-layout'>
        <div className='upload-wrapper'>
          <div className='upload-header'>
            <div className='upload-icon-wrapper'>
              <ShieldCheck className='w-10 h-10 text-blue-400' />
            </div>

            <h1 className='upload-title'>Secure File Upload</h1>

            <p className='upload-description'>
              Encrypt files locally using AES encryption before uploading them
              securely to decentralized IPFS storage powered by blockchain.
            </p>
          </div>

          <UploadForm />
        </div>
      </div>
    </div>
  )
}

export default Upload
