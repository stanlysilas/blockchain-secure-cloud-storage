const hre = require('hardhat')
const fs = require('fs')
const path = require('path')

async function main () {
  const Storage = await hre.ethers.getContractFactory('Storage')

  const storage = await Storage.deploy()

  await storage.waitForDeployment()

  const contractAddress = await storage.getAddress()

  console.log('Storage contract deployed to:')
  console.log(contractAddress)

  const contractsPath = path.join(__dirname, '../../client/src/contracts')

  fs.writeFileSync(
    path.join(contractsPath, 'config.js'),
    `export const CONTRACT_ADDRESS = "${contractAddress}"\n`
  )

  const artifact = require('../artifacts/contracts/Storage.sol/Storage.json')

  fs.writeFileSync(
    path.join(contractsPath, 'StorageABI.json'),
    JSON.stringify(artifact.abi, null, 2)
  )

  console.log('✅ Updated config.js')
  console.log('✅ Updated StorageABI.json')
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
