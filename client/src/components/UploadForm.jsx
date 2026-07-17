import { useState } from 'react'

import { UploadCloud, LockKeyhole, Trash2, Eye, EyeOff } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { uploadToIPFS } from '@/services/pinataService'

import { getContract } from '@/services/contractService'

import { encryptFile } from '@/services/encryptionService'

import UploadSuccessDialog from '@/components/dialogs/UploadSuccessDialog'

function UploadForm () {
  const formatFileSize = bytes => {
    if (bytes < 1024) return `${bytes} B`

    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`

    if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / 1024 / 1024).toFixed(2)} MB`

    return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`
  }

  const getFileType = file => {
    if (!file.type) return 'Unknown'

    const [category] = file.type.split('/')

    switch (category) {
      case 'image':
        return 'Image'

      case 'video':
        return 'Video'

      case 'audio':
        return 'Audio'

      case 'text':
        return 'Text Document'

      case 'application':
        if (file.type.includes('pdf')) return 'PDF Document'
        if (file.type.includes('zip')) return 'Archive'
        return 'Application File'

      default:
        return 'File'
    }
  }

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [file, setFile] = useState(null)

  const [loading, setLoading] = useState(false)
  const [uploadStage, setUploadStage] = useState('')

  const [dragging, setDragging] = useState(false)

  const [successOpen, setSuccessOpen] = useState(false)

  const handleUpload = async () => {
    if (!file) {
      alert('Select a file')
      return
    }

    if (!password) {
      alert('Enter encryption password')
      return
    }

    try {
      setLoading(true)

      setUploadStage('Encrypting file...')

      const encryptedFile = await encryptFile(file, password)

      setUploadStage('Uploading to IPFS...')

      const ipfsHash = await uploadToIPFS(encryptedFile)

      setUploadStage('Writing metadata to blockchain...')

      const contract = await getContract()

      const transaction = await contract.uploadFile(file.name, ipfsHash)

      await transaction.wait()

      setUploadStage('Upload completed')

      setSuccessOpen(true)

      setFile(null)
      setPassword('')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)

      setUploadStage('')
    }
  }

  return (
    <div className='upload-card'>
      <label
        className={`upload-dropzone ${
          dragging ? 'upload-dropzone-active' : ''
        } ${loading ? 'opacity-60 pointer-events-none' : ''}`}
        onDragOver={e => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => {
          e.preventDefault()

          setDragging(false)

          const selected = e.dataTransfer.files[0]

          if (selected) {
            setFile(selected)
          }
        }}
      >
        <input
          type='file'
          className='hidden'
          disabled={loading}
          onChange={e => setFile(e.target.files[0])}
        />

        <div className='bg-blue-500/10 border border-blue-500/20 rounded-full p-5 mb-6'>
          <UploadCloud className='w-12 h-12 text-blue-400' />
        </div>

        <h2 className='text-2xl font-bold mb-3'>
          {dragging ? 'Drop File Here' : file ? 'File Selected' : 'Select File'}
        </h2>

        <p className='text-gray-400 max-w-md leading-relaxed'>
          {dragging
            ? 'Release the file to begin the secure upload process.'
            : file
            ? 'Your encrypted file is ready for decentralized upload.'
            : 'Upload encrypted files securely to decentralized blockchain-powered storage.'}
        </p>

        {file && (
          <div className='upload-file-info'>
            <h3 className='upload-file-name'>{file.name}</h3>

            <div className='upload-file-grid'>
              <div>
                <p className='upload-file-label'>Type</p>
                <p>{getFileType(file)}</p>
              </div>

              <div>
                <p className='upload-file-label'>Size</p>
                <p>{formatFileSize(file.size)}</p>
              </div>

              <div>
                <p className='upload-file-label'>Modified</p>
                <p>{new Date(file.lastModified).toLocaleDateString()}</p>
              </div>

              <div>
                <p className='upload-file-label'>Status</p>
                <p className='text-green-400'>Ready</p>
              </div>
            </div>

            <div className='upload-file-actions mt-5'>
              <Button
                variant='destructive'
                onClick={() => setFile(null)}
                disabled={loading}
              >
                <Trash2 className='w-4 h-4 mr-2' />
                Remove File
              </Button>
            </div>
          </div>
        )}
      </label>

      <div className='upload-supported'>
        <p className='upload-supported-title'>Supported File Types</p>

        <div className='upload-supported-grid'>
          <span className='chip'>Documents</span>

          <span className='chip'>Images</span>

          <span className='chip'>Videos</span>

          <span className='chip'>Audio</span>

          <span className='chip'>Archives</span>
        </div>
      </div>

      <div className='upload-section'>
        <div className='relative'>
          <LockKeyhole className='absolute left-4 top-4 w-5 h-5 text-gray-500' />

          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Encryption Password'
            value={password}
            disabled={loading}
            onChange={e => setPassword(e.target.value)}
            className='input-field pl-12 pr-14'
          />

          <button
            type='button'
            disabled={loading}
            onClick={() => setShowPassword(prev => !prev)}
            className='absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition-colors'
          >
            {showPassword ? (
              <EyeOff className='w-5 h-5' />
            ) : (
              <Eye className='w-5 h-5' />
            )}
          </button>
        </div>

        <Button
          variant='blue'
          size='full'
          disabled={loading}
          onClick={handleUpload}
        >
          Upload Securely
        </Button>
        {loading && (
          <div className='upload-progress'>
            <div className='flex items-center gap-3'>
              <div className='loader-circle' />

              <span>{uploadStage}</span>
            </div>
          </div>
        )}
      </div>

      <p className='security-note'>
        Files are encrypted locally before upload. Your encryption password is
        never stored on blockchain or IPFS.
      </p>

      <UploadSuccessDialog
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
      />
    </div>
  )
}

export default UploadForm
