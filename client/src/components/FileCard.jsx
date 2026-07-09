import { FileText, Share2, Download } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useState } from 'react'

import { downloadAndDecryptFile } from '@/services/downloadService'

function FileCard ({ file, shareAddress, setShareAddress, shareFile }) {
  const [downloading, setDownloading] = useState(false)

  return (
    <div className='file-card'>
      <div className='file-card-header'>
        <div className='file-icon-wrapper'>
          <FileText className='w-7 h-7 text-blue-400' />
        </div>

        <div className='bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs px-3 py-1 rounded-full'>
          Encrypted
        </div>
      </div>

      <div className='file-meta'>
        <div>
          <p className='file-meta-label'>File Name</p>

          <p className='file-meta-value'>{file.fileName}</p>
        </div>

        <div>
          <p className='file-meta-label'>IPFS Hash</p>

          <p className='file-meta-value'>{file.ipfsHash}</p>
        </div>

        <div>
          <p className='file-meta-label'>Owner</p>

          <p className='file-meta-value'>{file.owner}</p>
        </div>

        <div>
          <p className='file-meta-label'>File ID</p>

          <p className='file-meta-value'>{file.id.toString()}</p>
        </div>
      </div>

      <div className='file-action-group'>
        <Button
          variant='success'
          size='full'
          disabled={downloading}
          onClick={async () => {
            setDownloading(true)

            try {
              await downloadAndDecryptFile(file.ipfsHash, file.fileName)
            } finally {
              setDownloading(false)
            }
          }}
        >
          <Download className='w-4 h-4 mr-2' />

          {downloading ? 'Decrypting...' : 'Download'}
        </Button>
      </div>

      <div className='mt-6 space-y-3'>
        <input
          type='text'
          placeholder='Wallet Address'
          value={shareAddress}
          onChange={e => setShareAddress(e.target.value)}
          className='input-field'
        />

        <Button variant='glass' size='full' onClick={() => shareFile(file.id)}>
          <Share2 className='w-4 h-4 mr-2' />
          Share Access
        </Button>
      </div>
    </div>
  )
}

export default FileCard
