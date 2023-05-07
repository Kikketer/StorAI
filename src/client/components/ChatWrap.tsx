import { FC, useState } from 'react'
import sendCommandToServer from '@wasp/actions/sendCommand'

export type ChatProps = {
  description?: string
  sendCommand: (T: { command: string }) => Promise<void>
  image: string
  loading: boolean
}

type ChatWrap = {
  children: (T: ChatProps) => JSX.Element
}

export const ChatWrap: FC<ChatWrap> = ({ children }) => {
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const sendCommand = async ({ command }: { command: string }) => {
    try {
      setLoading(true)
      const results = await sendCommandToServer({ command })
      setImage(results?.image ?? '')
      setDescription(results?.description ?? '')
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

  return <div>{children({ description, sendCommand, image, loading })}</div>
}
