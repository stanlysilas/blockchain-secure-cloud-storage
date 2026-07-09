import { createContext, useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'

const WalletContext = createContext()

export function WalletProvider ({ children }) {
  const [account, setAccount] = useState('')
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [walletName, setWalletName] = useState('')
  const [network, setNetwork] = useState(null)

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('MetaMask is not installed')
        return
      }

      const web3Provider = new ethers.BrowserProvider(window.ethereum)

      await web3Provider.send('eth_requestAccounts', [])

      const web3Signer = await web3Provider.getSigner()

      const address = await web3Signer.getAddress()

      const currentNetwork = await web3Provider.getNetwork()

      setProvider(web3Provider)
      setSigner(web3Signer)
      setAccount(address)
      setIsConnected(true)
      setNetwork(currentNetwork)

      const savedName = localStorage.getItem(address)

      setWalletName(savedName || '')
    } catch (error) {
      console.error(error)
    }
  }

  const switchWallet = async () => {
    try {
      if (!window.ethereum) return

      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }]
      })

      await connectWallet()
    } catch (error) {
      console.error(error)
    }
  }

  const switchToSepolia = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }]
      })

      await checkConnection()
    } catch (error) {
      console.error(error)
    }
  }

  const checkConnection = async () => {
    try {
      if (!window.ethereum) return

      const web3Provider = new ethers.BrowserProvider(window.ethereum)

      const accounts = await web3Provider.send('eth_accounts', [])

      const currentNetwork = await web3Provider.getNetwork()

      setProvider(web3Provider)
      setNetwork(currentNetwork)

      if (accounts.length > 0) {
        const web3Signer = await web3Provider.getSigner()

        setSigner(web3Signer)
        setAccount(accounts[0])
        setIsConnected(true)

        const savedName = localStorage.getItem(accounts[0])

        setWalletName(savedName || '')
      } else {
        setSigner(null)
        setAccount('')
        setWalletName('')
        setIsConnected(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    checkConnection()
  }, [])

  useEffect(() => {
    if (!window.ethereum) return

    const handleAccountsChanged = () => {
      checkConnection()
    }

    const handleChainChanged = () => {
      checkConnection()
    }

    window.ethereum.on('accountsChanged', handleAccountsChanged)

    window.ethereum.on('chainChanged', handleChainChanged)

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged)

      window.ethereum.removeListener('chainChanged', handleChainChanged)
    }
  }, [])

  return (
    <WalletContext.Provider
      value={{
        account,
        provider,
        signer,
        network,
        isConnected,
        walletName,
        setWalletName,
        connectWallet,
        switchWallet,
        switchToSepolia
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet () {
  return useContext(WalletContext)
}
