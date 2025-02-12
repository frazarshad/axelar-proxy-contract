require("@nomicfoundation/hardhat-toolbox"); // or require("@nomiclabs/hardhat-ethers") if using older setups
require("@nomicfoundation/hardhat-verify");

require("dotenv").config();

const { PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.28",
  etherscan: {
    apiKey: {
      snowtrace: "snowtrace", // apiKey is not required, just set a placeholder
    },
    customChains: [
      {
        network: "snowtrace",
        chainId: 43113,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan",
          browserURL: "https://avalanche.testnet.localhost:8080"
        }
      }
    ]
  },
  networks: {
    snowtrace: {
      url: "https://api.avax-test.network/ext/bc/C/rpc", // Avalanche Fuji RPC URL
      chainId: 43113, // Fuji chain ID
      accounts: [PRIVATE_KEY], // Array of private keys to use
    },
  },
};