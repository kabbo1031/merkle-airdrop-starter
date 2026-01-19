const { ethers } = require("hardhat");
const fs = require("fs");
const proofs = require("./proofs.json");

async function main() {
    // 1. Deploy Token
    const Token = await ethers.getContractFactory("AirdropToken");
    const token = await Token.deploy();
    await token.waitForDeployment();
    const tokenAddr = await token.getAddress();

    console.log(`Token deployed: ${tokenAddr}`);

    // 2. Deploy Distributor
    const Distributor = await ethers.getContractFactory("MerkleDistributor");
    // Use the root generated in Step 2
    const distributor = await Distributor.deploy(tokenAddr, proofs.root);
    await distributor.waitForDeployment();
    const distAddr = await distributor.getAddress();

    console.log(`Distributor deployed: ${distAddr}`);

    // 3. Fund the Distributor
    const fundAmount = ethers.parseEther("10000");
    await token.transfer(distAddr, fundAmount);
    console.log("Distributor funded with 10,000 tokens");

    fs.writeFileSync("deploy_config.json", JSON.stringify({ distributor: distAddr, token: tokenAddr }));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
