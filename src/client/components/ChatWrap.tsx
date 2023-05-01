import { FC, useState } from 'react'
import sendCommandToServer from '@wasp/actions/sendCommand'

export type ChatProps = {
  description?: string
  sendCommand: (T: { command: string }) => Promise<void>
  image: string
}

type ChatWrap = {
  children: (T: ChatProps) => JSX.Element
}

export const ChatWrap: FC<ChatWrap> = ({ children }) => {
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')

  const sendCommand = async ({ command }: { command: string }) => {
    try {
      const results = await sendCommandToServer({ command })
      setImage(results?.image ?? '')
      setDescription(results?.description ?? '')
    } catch (err) {
      console.error(err)
    }
  }

  return <div>{children({ description, sendCommand, image })}</div>
}
