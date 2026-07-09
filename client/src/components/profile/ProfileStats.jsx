import { useEffect, useState } from 'react'
import { getContract } from '@/services/contractService'

function ProfileStats () {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const load = async () => {
      try {
        const contract = await getContract()

        const files = await contract.getMyFiles()

        setCount(files.length)
      } catch {}
    }

    load()
  }, [])

  return (
    <div className='dashboard-stat-grid mt-6'>
      <div className='dashboard-stat-card'>
        <p className='dashboard-stat-label'>Files Uploaded</p>

        <h2 className='dashboard-stat-value'>{count}</h2>
      </div>

      <div className='dashboard-stat-card'>
        <p className='dashboard-stat-label'>Encryption</p>

        <h2 className='dashboard-stat-value'>AES-256</h2>
      </div>

      <div className='dashboard-stat-card'>
        <p className='dashboard-stat-label'>Storage</p>

        <h2 className='dashboard-stat-value'>IPFS</h2>
      </div>
    </div>
  )
}

export default ProfileStats
