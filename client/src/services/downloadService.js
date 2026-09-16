import { decryptFile } from './encryptionService'

export const decryptFileFromIPFS = async (ipfsHash, password) => {
  const response = await fetch(`https://red-secondary-canidae-793.mypinata.cloud/ipfs/${ipfsHash}`)

  const encryptedBlob = await response.blob()

  const encryptedText = await encryptedBlob.text()

  let decryptedBlob

  try {
    const decryptedData = decryptFile(encryptedText, password)

    const blobResponse = await fetch(decryptedData)

    decryptedBlob = await blobResponse.blob()
  } catch {
    throw new Error('Incorrect encryption password')
  }

  if (!decryptedBlob || decryptedBlob.size === 0) {
    throw new Error('Failed to decrypt file')
  }

  return {
    blob: decryptedBlob,
    url: URL.createObjectURL(decryptedBlob)
  }
}

export const downloadBlob = (blobUrl, fileName) => {
  const a = document.createElement('a')

  a.href = blobUrl

  a.download = fileName

  a.click()

  URL.revokeObjectURL(blobUrl)
}

export const downloadAndDecryptFile = async (ipfsHash, fileName, password) => {
  const result = await decryptFileFromIPFS(ipfsHash, password)

  downloadBlob(result.url, fileName)
}

export const previewAndDecryptFile = async (ipfsHash, password) => {
  return await decryptFileFromIPFS(ipfsHash, password)
}
