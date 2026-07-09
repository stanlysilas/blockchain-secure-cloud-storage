import CryptoJS from 'crypto-js'

export const encryptFile = async (file, password) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => {
      try {
        const fileData = reader.result

        const encryptedData = CryptoJS.AES.encrypt(
          fileData,
          password
        ).toString()

        const encryptedBlob = new Blob([encryptedData], {
          type: 'text/plain'
        })

        resolve(encryptedBlob)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = error => reject(error)
  })
}

export const decryptFile = (encryptedText, password) => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, password)

  return bytes.toString(CryptoJS.enc.Utf8)
}
