const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const whitelist = require('./whitelist.json');
const ethers = require('ethers');
const fs = require('fs');

function main() {
    // 1. Structure data: index, address, amount
    const elements = whitelist.map((entry, index) => {
        // Solidity: abi.encodePacked(index, account, amount)
        return ethers.solidityPacked(
            ['uint256', 'address', 'uint256'],
            [index, entry.address, ethers.parseEther(entry.amount)]
        );
    });

    // 2. Hash leaves
    const leaves = elements.map(el => keccak256(el));

    // 3. Create Tree
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    const root = tree.getHexRoot();

    console.log("Merkle Root:", root);

    // 4. Generate Proofs for all users
    const data = whitelist.map((entry, index) => {
        const leaf = leaves[index];
        const proof = tree.getHexProof(leaf);
        return {
            index,
            address: entry.address,
            amount: ethers.parseEther(entry.amount).toString(),
            proof
        };
    });

    fs.writeFileSync("proofs.json", JSON.stringify({ root, claims: data }, null, 2));
    console.log("Proofs generated in proofs.json");
}

main();
