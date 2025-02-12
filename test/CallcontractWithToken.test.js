
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CallcontractWithToken", function () {
  let CallcontractWithToken;
  let callcontractWithToken;
  let owner;
  let addr1;
  let addr2;
  let token;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    CallcontractWithToken = await ethers.getContractFactory("CallContractWithToken");
    [owner, addr1, addr2, _] = await ethers.getSigners();

    // Deploy the CallcontractWithToken contract
    callcontractWithToken = await CallcontractWithToken.deploy(
    '0xC249632c2D40b9001FE907806902f63038B737Ab',
    '0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6',
    '0x8B9b2AF4afB389b4a70A474dfD4AdCD4a302bb40'
    );
    // await callcontractWithToken.deployed();

    // Call contract function

const tokenAddress = "0x57F1c63497AEe0bE305B8852b354CEc793da43bB";
const amount = ethers.parseUnits("1.0", 18); // Example amount
    const p = await callcontractWithToken.executeWithTokenAddress(tokenAddress, amount);
    console.log("Result:", p);
  });
});