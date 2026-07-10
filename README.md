# BlockDrive

BlockDrive is a decentralized cloud storage application developed as part of a Master's project. It combines blockchain technology, decentralized storage and client-side encryption to provide secure file storage and controlled file sharing.

Files are encrypted locally using AES before being uploaded to IPFS. Ownership and access permissions are managed through Ethereum smart contracts deployed on the Sepolia test network.

## Features

- MetaMask wallet authentication
- AES encrypted file storage
- Decentralized file storage using IPFS
- Ethereum smart contract based ownership
- Secure file sharing between Ethereum wallets
- Blockchain-based access control
- Download and decrypt encrypted files
- Responsive user interface
- Modern React-based frontend

## Technology Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Ethers.js

### Backend

- Express.js
- Pinata IPFS API

### Blockchain

- Solidity
- Hardhat
- Ethereum Sepolia Testnet
- MetaMask

### Cryptography

- AES Encryption (CryptoJS)

## System Architecture

```
React Client
      │
      ▼
Express Backend ─────► Pinata IPFS
      │
      ▼
Ethereum Smart Contract (Sepolia)
```

## Project Objectives

- Demonstrate decentralized cloud storage using IPFS.
- Implement blockchain-based ownership and access control.
- Secure user files through client-side AES encryption.
- Integrate Ethereum wallets using MetaMask.
- Develop a responsive decentralized application (DApp).

## Author

**Stanly Silas**

Master of Science in Computer Science

Andhra University

## License

This project is licensed under the MIT License.
