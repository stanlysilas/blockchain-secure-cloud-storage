import { ethers } from 'ethers'

import StorageABI from '../contracts/StorageABI.json'

import { CONTRACT_ADDRESS } from '../contracts/config'

export const getContract = async () => {
  if (!window.ethereum) {
    throw new Error('MetaMask not found')
  }

  const provider = new ethers.BrowserProvider(window.ethereum)

  const signer = await provider.getSigner()

  const contract = new ethers.Contract(CONTRACT_ADDRESS, StorageABI, signer)

  return contract
}
