import { FC, useState } from 'react'
import sendCommandToServer from '@wasp/actions/sendCommand'

export type ChatProps = {
  description?: string
  options?: string[]
  sendCommand: (T: { command: string }) => Promise<void>
  image: string
}

type ChatWrap = {
  children: (T: ChatProps) => JSX.Element
}

export const ChatWrap: FC<ChatWrap> = ({ children }) => {
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [options, setOptions] = useState<string[]>([])

  const sendCommand = async ({ command }: { command: string }) => {
    try {
      const results = await sendCommandToServer({ command })
      setImage(results?.image ?? '')
      setDescription(results?.description ?? '')
      setOptions(results?.options ?? [])
    } catch (err) {
      console.error(err)
    }
  }

  return <div>{children({ description, options, sendCommand, image })}</div>
}
