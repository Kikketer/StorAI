import React, { createContext, useContext, useMemo, useEffect, FC } from 'react'
import { useHistory } from 'react-router-dom'
import { Character } from '@wasp/entities'
import { useCharacter } from '../hooks/useCharacter'

export type CharacterProps = {
  character?: Character
  damageBody: (T: { component: 'head'; amount: number }) => Promise<void>
}

type CharacterWrap = {
  children: (T: CharacterProps) => JSX.Element
}

export const CharacterWrap: FC<CharacterWrap> = ({ children }) => {
  const history = useHistory()
  const { character, error, isFetching, damageBody } = useCharacter()

  if (isFetching) return <div>Loading...</div>
  if (error) return <div>Oh no... {error.message}</div>

  if (!character) {
    history.replace('/create')
    return null
  }

  return <div>{children({ character, damageBody })}</div>
}

CharacterWrap.displayName = 'CharacterProvider'
