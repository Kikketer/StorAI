import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { Character, History } from '@wasp/entities'
import { useCharacter } from '../hooks/useCharacter'

export type CharacterProps = {
  character?: Character
  currentRoom?: History
}

type CharacterWrap = {
  children: (T: CharacterProps) => JSX.Element
}

export const CharacterWrap: FC<CharacterWrap> = ({ children }) => {
  const history = useHistory()
  const { character, currentRoom, error, isLoading } = useCharacter()

  if (isLoading && !character) return <div>Loading Game...</div>
  if (error) return <div>Oh no... {error.message}</div>

  if (!isLoading && !character) {
    history.replace('/create')
    return null
  }

  return <div>{children({ character, currentRoom })}</div>
}

CharacterWrap.displayName = 'CharacterProvider'
