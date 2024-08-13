import 'dotenv/config'
import bs58 from 'bs58'
import { addKeypairToEnvFile } from '@solana-developers/helpers'
import {
    Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram,
    Transaction
} from '@solana/web3.js'

export const generateKeypair = async (): Promise<void> => {
  const keypair = Keypair.generate()
  await addKeypairToEnvFile(keypair, 'SECRET_KEY', '.env')

  console.log(`Public key: `, keypair.publicKey.toBase58())
  console.log(`Private key: `, keypair.secretKey)
  console.log(`Private key encoded: `, bs58.encode(keypair.secretKey))
  console.log(`✅ Finished!`)
}

export const getKeypairFromEnv = (): Keypair => {
  const secret = Uint8Array.from(JSON.parse(process.env.SECRET_KEY!))
  const keypair = Keypair.fromSecretKey(secret)
  // @TODO seems like this helper function doesn't work correctly on current version of solana-developers/helpers
  // const keypair = getKeypairFromEnvironment("SECRET_KEY");
  console.log(`Public key: ${keypair.publicKey.toBase58()}`)
  console.log(`✅ Finished! We've loaded our secret key securely, using an env file!`)

  return keypair
}

export const getBalance = async (walletAddress: string): Promise<void> => {
  if (!walletAddress) {
    throw new Error('Provide a public key to check the balance of!')
  }

  const mainnetRpcUrl = process.env.DEVNET_RPC_URL!

  console.log(`🔗 Connecting to ${mainnetRpcUrl}...`)

  const connection = new Connection(mainnetRpcUrl, 'confirmed')
  const publicKey = new PublicKey(walletAddress)
  const balanceInLamports = await connection.getBalance(publicKey)
  const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL

  console.log(`✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`)
}

export const transfer = async (walletAddress: string, amount: number): Promise<void> => {
  if (!walletAddress) {
    console.log(`Please provide a public key to send to`)
    process.exit(1)
  }

  const senderKeypair = getKeypairFromEnv()

  console.log(`suppliedToPubkey: ${walletAddress}`)

  const toPubkey = new PublicKey(walletAddress)
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

  console.log(`✅ Loaded our own keypair, the destination public key, and connected to Solana`)

  const transaction = new Transaction()
  const LAMPORTS_TO_SEND = amount * LAMPORTS_PER_SOL
  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND
  })

  transaction.add(sendSolInstruction)

  const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair])

  console.log(`💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `)
  console.log(`Transaction signature is ${signature}!`)
}
