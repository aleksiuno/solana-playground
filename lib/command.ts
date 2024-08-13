import { generateKeypair, getBalance, getKeypairFromEnv, ping, transfer } from './wallet'

export enum Command {
  generateKeypair = 'generate-keypair',
  getKeypair = 'keypair',
  getBalance = 'balance',
  transfer = 'transfer',
  ping = 'ping'
}

export const commandHandlers: { [key in Command]: (arg?: string[]) => void } = {
  [Command.generateKeypair]: () => generateKeypair(),
  [Command.getKeypair]: () => getKeypairFromEnv(),
  [Command.getBalance]: arg => getBalance(arg![0]),
  [Command.transfer]: arg => transfer(arg![0], Number(arg![1])),
  [Command.ping]: () => ping()
}
