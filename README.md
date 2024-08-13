# Solana Playground

## About

This repository is made by following Solana courses that can be found on [Solana webpage](https://solana.com/developers/courses). It's made as a playground for most basic solana Web3 functions.

## Getting started

How to start:

1. Copy `.env.example` file and rename it to `.env`.
2. Run `npm install` to install dependencies
3. You can start by typing `npm run solana`. It will output all available commands.

Available commands:

- `npm run solana generate-keypair` will generate a keypair and store it to your .env file.
- `npm run solana keypair` will load keypair from `.env` file `SECRET_KEY` variable and print out the public key.
- `npm run solana balance {WALLET_PUBLIC_KEY}` will print out SOL balance of wallet
- `npm run solana transfer {WALLET_PUBLIC_KEY} {AMOUNT_OF_SOL_TO_TRANSFER}` will transfer the requested amount of SOL from your wallet saved in `.env` to wallet passed as argument.
