const API_URL =
  import.meta.env.DEV
    ? 'http://localhost:5000'
    : 'https://blockchain-secure-cloud-storage.onrender.com'

export async function uploadToIPFS(file) {
  const formData = new FormData()

  formData.append('file', file)

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData
  })

  const data = await response.json()

  return data.IpfsHash
}