const { ethers } = require("hardhat");
const contract1 = require("./artifacts/contracts/Proxy.sol/CallContractWithToken.json");
const tokenContractMetadata = require("./artifacts/@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IERC20.sol/IERC20.json");
const aavePoolAbi = require("./abi/Aave.json");
const aaveGateway = require("./abi/aaveGateway.json");
const aaveWavax = require("./abi/aaveWavax.json");

async function main() {
    // const contractAddress = "0x8B9b2AF4afB389b4a70A474dfD4AdCD4a302bb40"; // AavePool
//   const contractAddress = "0x8A007E495449ffeda4C2d65f14eE31f8Bcb022CF"; // AaveGateway
  //   const contractAddress = "0x5e86f7F026F5f48ca8982D442303aF91170d41bC";
    // const contractAddress = "0x098A6F244C439853d5245aD5a3110BE440db038C";
    const contractAddress = "0x71AF887306Cdaa390e81D3E29649f6168166cdd0"; // CallContractWithToken


//   const abi = aaveGateway;
//   const abi = aavePoolAbi;
  const abi = contract1.abi;

  const provider = new ethers.JsonRpcProvider(
    "https://api.avax-test.network/ext/bc/C/rpc"
  );
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contract = new ethers.Contract(contractAddress, abi, signer);
  //   const contract = new ethers.Contract(contractAddress, contract1.abi, signer);

  // Call a function from the contract
  const onBehalfOf = "0x20E68F6c276AC6E297aC46c84Ab260928276691D"; // Replace with the actual address

  const tokenAddress = "0xd00ae08403B9bbb9124bB305C09058E32C39A48c"; // WAVAX

    // const tokenAddress = "0x339f50bCbd874A892fb2c6A56Cf8D85Dd215Bf8e"; // aAvaWAVAX
    // const tokenAddress = "0x5425890298aed601595a70AB815c96711a31Bc65"; // USDC
//   const tokenAddress = "0x2f6179f64FFe203899600Ba26d10979B314eA13D"; // WAVAX aave


  const tokenContract = new ethers.Contract(
    tokenAddress,
    aaveWavax,
    // tokenContractMetadata.abi,
    signer
  );
  const amount = ethers.parseUnits("0.01", 18); // Example amount

//   const res = await  tokenContract.approve(contractAddress, amount * BigInt(5)); // Approve Aave Pool
//   console.log("Result1:", res);

//   const result = await contract.supply(tokenAddress, amount, onBehalfOf, 0);
//   const result = await contract.withdraw(tokenAddress, amount, onBehalfOf);


//   const result = await tokenContract.deposit({ value: amount });
//   const result = await contract.depositETH(tokenAddress, onBehalfOf, 0, { value: amount });
//   const result = await contract.withdrawETH(tokenAddress, amount, onBehalfOf);
//   const result = await contract.borrowETH(tokenAddress, amount, onBehalfOf);

//   const result = await contract.executeWithTokenSymbol('WAVAX', amount);
  const result = await contract.executeWithTokenAddress(tokenAddress, amount);

  console.log("Result:", result);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
