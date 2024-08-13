import { generateKeypair, getBalance, loadKeypair, transfer } from './services'

const commandHandlers: { [key: string]: (arg?: string[]) => void } = {
  generateKeypair: () => generateKeypair(),
  keypair: () => loadKeypair(),
  balance: arg => getBalance(arg![0]),
  transfer: arg => transfer(arg![0], Number(arg![1]))
}

export const handleInput = (command: string, args?: string[]): void => {
  const handler = commandHandlers[command]
  if (handler) {
    handler(args)
  } else {
    console.log(`Command ${command} not recognized`)
  }
}

export const processInput = (input: string[]): void => {
  const [command, ...args] = input.slice(2)
  handleInput(command, args)
}
