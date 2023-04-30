import { FC } from 'react'
import sendCommandToServer from '@wasp/actions/sendCommand'

type ChatProps = {
  sendCommand: (T: { command: string }) => Promise<void>
}

type ChatWrap = {
  children: (T: ChatProps) => JSX.Element
}

export const ChatWrap: FC<ChatWrap> = ({ children }) => {
  const sendCommand = async ({ command }: { command: string }) => {
    try {
      await sendCommandToServer({ command })
    } catch (err) {
      console.error(err)
    }
  }

  return <div>{children({ sendCommand })}</div>
}
