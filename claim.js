const { ethers } = require("hardhat");
const fs = require("fs");
const proofs = require("./proofs.json");
const config = require("./deploy_config.json");

async function main() {
    const [claimer] = await ethers.getSigners();
    const distributor = await ethers.getContractAt("MerkleDistributor", config.distributor, claimer);

    // Find claim data for this user
    // In Hardhat local, claimer is usually the first address in whitelist.json
    const claimData = proofs.claims.find(c => c.address.toLowerCase() === claimer.address.toLowerCase());

    if (!claimData) {
        console.log("No claim found for this address.");
        return;
    }

    console.log(`Claiming ${ethers.formatEther(claimData.amount)} tokens...`);

    try {
        const tx = await distributor.claim(
            claimData.index,
            claimData.address,
            claimData.amount,
            claimData.proof
        );
        await tx.wait();
        console.log("Claim Successful!");
    } catch (e) {
        console.error("Claim Failed:", e.message);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
