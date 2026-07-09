# Blockchain Secure Cloud Storage

A decentralized cloud storage application built using React, Solidity, Ethereum Sepolia, IPFS and MetaMask.

## Features

- Secure wallet authentication with MetaMask
- AES encrypted file storage
- Upload files to IPFS (Pinata)
- Ethereum smart contract for file ownership
- Share encrypted files with other wallets
- Access control and permission management
- Download and decrypt shared files
- Responsive modern dashboard

## Technology Stack

- React + Vite
- Solidity
- Hardhat
- Ethers.js
- MetaMask
- Ethereum Sepolia
- Pinata IPFS
- Express.js
- Tailwind CSS

## Running Locally

### Smart Contract

```bash
cd blockchain
npm install
npm run deploy:sepolia
```

### Backend

```bash
cd server
npm install
node server.js
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## License

MIT