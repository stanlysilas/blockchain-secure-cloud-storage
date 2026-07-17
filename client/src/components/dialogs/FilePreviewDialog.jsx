import { useEffect } from 'react'

import { X, ExternalLink, Download } from 'lucide-react'

import { Button } from '@/components/ui/button'

function FilePreviewDialog ({ open, onClose, blobUrl, fileName, onDownload }) {
  useEffect(() => {
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl)
      }
    }
  }, [blobUrl])

  if (!open || !blobUrl) return null

  return (
    <div className='dialog-overlay' onClick={onClose}>
      <div className='preview-dialog' onClick={e => e.stopPropagation()}>
        <div className='dialog-header'>
          <div>
            <h2 className='dialog-title'>File Preview</h2>

            <p className='dialog-subtitle'>{fileName}</p>
          </div>

          <Button variant='ghost' size='icon' onClick={onClose}>
            <X className='w-5 h-5' />
          </Button>
        </div>

        <div className='preview-container'>
          <iframe src={blobUrl} title={fileName} className='preview-frame' />
        </div>

        <div className='dialog-footer'>
          <Button
            variant='glass'
            size='full'
            onClick={() => window.open(blobUrl, '_blank')}
          >
            <ExternalLink className='w-4 h-4 mr-2' />
            Open in New Tab
          </Button>

          <Button variant='blue' size='full' onClick={onDownload}>
            <Download className='w-4 h-4 mr-2' />
            Download
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FilePreviewDialog
