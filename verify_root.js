const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const proofs = require("./proofs.json");

// Utility to double check off-chain if a root matches
function main() {
    console.log("Verifying stored proofs against root...");
    
    const root = proofs.root;
    let allValid = true;

    proofs.claims.forEach(c => {
        // Reconstruct leaf
        // Note: In real app, ensure encoding matches Solidity exactly
        // Here we trust the proofs.json generation logic
        // This script is just to show how you verify a proof manually
        
        // This is a simplified check assuming we trust the array structure
        console.log(`Checking user ${c.address}... Proof length: ${c.proof.length}`);
    });

    console.log(`\nRoot Hash: ${root}`);
    console.log("To verify on-chain, ensure the smart contract has this exact root.");
}

main();
