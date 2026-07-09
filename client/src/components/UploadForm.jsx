import { useState } from 'react'

import { UploadCloud, LockKeyhole } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { uploadToIPFS } from '@/services/pinataService'

import { getContract } from '@/services/contractService'

import { encryptFile } from '@/services/encryptionService'

function UploadForm () {
  const [password, setPassword] = useState('')

  const [file, setFile] = useState(null)

  const [loading, setLoading] = useState(false)

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

      const encryptedFile = await encryptFile(file, password)

      const ipfsHash = await uploadToIPFS(encryptedFile)

      const contract = await getContract()

      const transaction = await contract.uploadFile(file.name, ipfsHash)

      await transaction.wait()

      alert('Encrypted file uploaded successfully')

      setFile(null)

      setPassword('')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='upload-card'>
      <label className='upload-dropzone'>
        <input
          type='file'
          className='hidden'
          onChange={e => setFile(e.target.files[0])}
        />

        <div className='bg-blue-500/10 border border-blue-500/20 rounded-full p-5 mb-6'>
          <UploadCloud className='w-12 h-12 text-blue-400' />
        </div>

        <h2 className='text-2xl font-bold mb-3'>
          {file ? 'File Selected' : 'Select File'}
        </h2>

        <p className='text-gray-400 max-w-md leading-relaxed'>
          {file
            ? 'Your encrypted file is ready for decentralized upload.'
            : 'Upload encrypted files securely to decentralized blockchain-powered storage.'}
        </p>

        {file && (
          <div className='mt-6 bg-blue-500/10 border border-blue-500/20 px-4 py-3 rounded-2xl text-blue-300 text-sm max-w-full break-all'>
            {file.name}
          </div>
        )}
      </label>

      <div className='upload-section'>
        <div className='relative'>
          <LockKeyhole className='absolute left-4 top-4 w-5 h-5 text-gray-500' />

          <input
            type='password'
            placeholder='Encryption Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='input-field pl-12'
          />
        </div>

        <Button
          variant='blue'
          size='full'
          disabled={loading}
          onClick={handleUpload}
        >
          {loading ? 'Encrypting & Uploading...' : 'Upload Securely'}
        </Button>
      </div>

      <p className='security-note'>
        Files are encrypted locally before upload. Your encryption password is
        never stored on blockchain or IPFS.
      </p>
    </div>
  )
}

export default UploadForm
