import { decryptFile } from './encryptionService'

export const downloadAndDecryptFile = async (ipfsHash, fileName) => {
  try {
    const password = prompt('Enter encryption password')

    if (!password) return

    const response = await fetch(
      `https://gateway.pinata.cloud/ipfs/${ipfsHash}`
    )

    const encryptedBlob = await response.blob()

    const encryptedText = await encryptedBlob.text()

    let decryptedBlob

    try {
      const decryptedData = decryptFile(encryptedText, password)
      const response = await fetch(decryptedData)

      decryptedBlob = await response.blob()
    } catch {
      alert('Incorrect encryption password')

      return
    }

    if (!decryptedBlob || decryptedBlob.size === 0) {
      alert('Incorrect encryption password')

      return
    }

    const url = window.URL.createObjectURL(decryptedBlob)

    const a = document.createElement('a')

    a.href = url

    a.download = fileName

    a.click()

    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error(error)

    alert('Failed to decrypt or download file')
  }
}
