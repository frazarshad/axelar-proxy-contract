async function main() {
  // Get the contract to deploy
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying Contract...");

  const simpleStorage = await SimpleStorage.deploy(); // Deploy the contract
  await simpleStorage.deployed(); // Wait for deployment to complete

  console.log("Contract deployed to:", simpleStorage.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
