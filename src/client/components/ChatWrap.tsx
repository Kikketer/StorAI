import { FC } from 'react'

type ChatProps = {
  sendCommand: (T: { command: string }) => Promise<void>
}

type ChatWrap = {
  children: (T: ChatProps) => JSX.Element
}

export const ChatWrap: FC<ChatWrap> = ({ children }) => {
  const sendCommand = async () => {}

  return <div>{children({ sendCommand })}</div>
}
