import { Command, commandHandlers } from './command'

export const handleInput = (command: string, args?: string[]): void => {
  const handler = commandHandlers[command]
  if (handler) {
    handler(args)
  } else {
    console.log(`Command "${command}" not recognized`)
    console.log(`Available commands: ${Object.values(Command).join(', ')}`)
  }
}

export const processInput = (input: string[]): void => {
  const [command, ...args] = input.slice(2)
  handleInput(command, args)
}
