async function main() {
  // Get the contract to deploy
  const Contract = await ethers.getContractFactory("AaveProxy");
  console.log("Deploying Contract...");

  const contract = await Contract.deploy(
    '0x8B9b2AF4afB389b4a70A474dfD4AdCD4a302bb40',
    '0x20E68F6c276AC6E297aC46c84Ab260928276691D',
    // '0xC249632c2D40b9001FE907806902f63038B737Ab',
    // '0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6',
    // '0x8B9b2AF4afB389b4a70A474dfD4AdCD4a302bb40'
  ); // Deploy the contract
  console.log(contract);
  console.log("Contract deployed to:", contract.address);
  await contract.deployed(); // Wait for deployment to complete

  console.log("Contract deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
