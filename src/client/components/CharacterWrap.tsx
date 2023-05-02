import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { Character, History } from '@wasp/entities'
import { useCharacter } from '../hooks/useCharacter'

export type CharacterProps = {
  character?: Character
  currentRoom?: History
  damageBody: (T: { component: 'head'; amount: number }) => Promise<void>
}

type CharacterWrap = {
  children: (T: CharacterProps) => JSX.Element
}

export const CharacterWrap: FC<CharacterWrap> = ({ children }) => {
  const history = useHistory()
  const { character, currentRoom, error, isFetching, damageBody } =
    useCharacter()

  if (isFetching && !character) return <div>Loading...</div>
  if (error) return <div>Oh no... {error.message}</div>

  if (!character) {
    history.replace('/create')
    return null
  }

  return <div>{children({ character, currentRoom, damageBody })}</div>
}

CharacterWrap.displayName = 'CharacterProvider'
