import FileMenu from '@/components/ui/FileMenu'

import FileIcon from '@/components/ui/FileIcon'

import FileInformationDialog from '@/components/dialogs/FileInformationDialog'
import ShareAccessDialog from '@/components/dialogs/ShareAccessDialog'
import FilePreviewDialog from '@/components/dialogs/FilePreviewDialog'
import DecryptionDialog from '@/components/dialogs/DecryptionDialog'

import {
  downloadAndDecryptFile,
  previewAndDecryptFile,
  downloadBlob
} from '@/services/downloadService'

import { useState } from 'react'

function FileItem ({ file, deleteFile, shareFile, mode = 'dashboard', revokeAccess }) {
  const [infoOpen, setInfoOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)

  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewBlob, setPreviewBlob] = useState(null)

  const [decryptOpen, setDecryptOpen] = useState(false)
  const [decryptLoading, setDecryptLoading] = useState(false)
  const [decryptError, setDecryptError] = useState('')

  const [pendingAction, setPendingAction] = useState(null)

  const openPreview = () => {
    setPendingAction('preview')
    setDecryptError('')
    setDecryptOpen(true)
  }

  const extension = file.fileName.split('.').pop()?.toUpperCase() || 'FILE'

  const canDelete = mode === 'dashboard' || mode === 'shared'
  const canShare = mode !== 'received'
  const canPreview = true
  const canDownload = true
  const canInfo = true

  return (
    <>
      <div
        className='file-item cursor-pointer'
        onClick={e => {
          if (e.target.closest('.file-menu')) return

          openPreview()
        }}
      >
        <div className='flex justify-center mb-4'>
          <FileIcon fileName={file.fileName} />
        </div>

        <div className='mt-4 flex items-start justify-between gap-3 w-full'>
          <div className='flex-1 min-w-0'>
            <h3
              className='truncate text-sm font-semibold'
              title={file.fileName}
            >
              {file.fileName}
            </h3>

            <p className='mt-1 text-xs text-gray-400'>{extension}</p>
          </div>

          <FileMenu
            disabled={decryptLoading}
            canPreview={canPreview}
            canDownload={canDownload}
            canShare={canShare}
            canInfo={canInfo}
            canDelete={canDelete}
            onPreview={openPreview}
            onDownload={() => {
              setPendingAction('download')
              setDecryptError('')
              setDecryptOpen(true)
            }}
            onShare={() => setShareOpen(true)}
            onInfo={() => setInfoOpen(true)}
            onDelete={() => deleteFile(file.id)}
          />
        </div>
      </div>
      <FilePreviewDialog
        open={previewOpen}
        blobUrl={previewBlob?.url}
        fileName={file.fileName}
        onClose={() => {
          setPreviewOpen(false)
          setPreviewBlob(null)
        }}
        onDownload={() => downloadBlob(previewBlob.url, file.fileName)}
      />

      <ShareAccessDialog
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        file={file}
        onShare={shareFile}
      />

      <FileInformationDialog
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        file={file}
        onRevoke={revokeAccess}
      />

      <DecryptionDialog
        open={decryptOpen}
        title={pendingAction === 'download' ? 'Download File' : 'Preview File'}
        loading={decryptLoading}
        error={decryptError}
        onClose={() => {
          if (decryptLoading) return

          setDecryptOpen(false)
          setDecryptError('')
        }}
        onDecrypt={async password => {
          setDecryptLoading(true)
          setDecryptError('')

          try {
            if (pendingAction === 'download') {
              await downloadAndDecryptFile(
                file.ipfsHash,
                file.fileName,
                password
              )

              setDecryptOpen(false)
            }

            if (pendingAction === 'preview') {
              const result = await previewAndDecryptFile(
                file.ipfsHash,
                password
              )

              setPreviewBlob(result)

              setPreviewOpen(true)

              setDecryptOpen(false)
            }
          } catch (error) {
            setDecryptError(error.message)
          } finally {
            setDecryptLoading(false)
          }
        }}
      />
    </>
  )
}

export default FileItem
