# Merkle Airdrop Starter

![Solidity](https://img.shields.io/badge/solidity-^0.8.20-blue)
![Cryptography](https://img.shields.io/badge/crypto-MerkleTree-red)
![License](https://img.shields.io/badge/license-MIT-green)

## Overview

Storing thousands of addresses in a smart contract array is prohibitively expensive. **Merkle Airdrop Starter** solves this by storing only a single 32-byte cryptographic hash (the "Merkle Root") on-chain. Users prove their eligibility by providing a "Merkle Proof" generated off-chain.

## Workflow

1.  **Off-Chain**: Create a list of eligible wallets and amounts (`whitelist.json`).
2.  **Generate**: Run `generate_tree.js` to create the Merkle Tree and Root.
3.  **Deploy**: Launch the contract with the Merkle Root.
4.  **Claim**: Users call `claim()` with their specific proof to receive tokens.

## Prerequisites

-   Node.js v16+
-   Hardhat

## Usage

```bash
# 1. Install
npm install

# 2. Generate Tree & Proofs
node generate_tree.js

# 3. Deploy Contract (using Root from Step 2)
npx hardhat run deploy.js --network localhost

# 4. Claim Tokens
node claim.js
