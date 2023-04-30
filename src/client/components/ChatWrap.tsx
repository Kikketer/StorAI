import { FC, useState } from 'react'
import { Character } from '@wasp/entities'
import sendCommandToServer from '@wasp/actions/sendCommand'

export type ChatProps = {
  sendCommand: (T: { command: string }) => Promise<void>
  image: string
}

type ChatWrap = {
  character?: Character
  children: (T: ChatProps) => JSX.Element
}

export const ChatWrap: FC<ChatWrap> = ({ character, children }) => {
  const [image, setImage] = useState('')
  const sendCommand = async ({ command }: { command: string }) => {
    try {
      if (character) {
        const results = await sendCommandToServer({
          characterId: character.id,
          command,
        })
        setImage(results?.image ?? '')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return <div>{children({ sendCommand, image })}</div>
}
