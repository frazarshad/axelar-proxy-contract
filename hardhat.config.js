require("@nomicfoundation/hardhat-toolbox"); // or require("@nomiclabs/hardhat-ethers") if using older setups
require("dotenv").config();

const { PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.28",
  networks: {
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc", // Avalanche Fuji RPC URL
      chainId: 43113, // Fuji chain ID
      accounts: [PRIVATE_KEY], // Array of private keys to use
    },
  },
};