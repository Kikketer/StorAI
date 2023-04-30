import React, { createContext, useContext, useMemo, FC } from 'react'
import { Character } from '@wasp/entities'
import getCharacter from '@wasp/queries/getCharacter'
import { useQuery } from '@wasp/queries'
import damage from '@wasp/actions/damage'

type CharacterBase = {}

type CharacterContextProps = {
  character: Character
  isFetching: boolean
  error: any
  getHit: (T: { component: 'head'; amount: number }) => Promise<void>
}

const CharacterContext = createContext<CharacterContextProps | null>(null)

const CharacterProvider: FC<CharacterBase> = ({ children }): JSX.Element => {
  const {
    data: character,
    error,
    isFetching,
  } = useQuery<{ id: number }, Character>(getCharacter)

  const getHit = async ({
    component,
    amount,
  }: {
    component: 'head'
    amount: number
  }) => {
    try {
      if (character) {
        await damage({ id: character.id, component, amount })
      }
    } catch (err) {
      console.error(err)
    }
  }

  const availableAttributes = useMemo(() => {
    return {
      character,
      isFetching,
      error,
      getHit,
    }
  }, [character, isFetching, error, damage])

  if (isFetching) return <div>Loading...</div>
  if (error) return <div>Oh no... {error.message}</div>

  return (
    <CharacterContext.Provider value={availableAttributes}>
      {children}
    </CharacterContext.Provider>
  )
}

const useCharacter = (): CharacterContextProps => {
  const context = useContext(CharacterContext)
  if (!context)
    throw new Error('useCharacter must be used within a CharacterProvider')
  return context
}

CharacterProvider.displayName = 'CharacterProvider'

export { useCharacter, CharacterProvider }
