import { Character } from '@wasp/entities'
import getCharacter from '@wasp/queries/getCharacter'
import createCharacter from '@wasp/actions/createCharacter'
import { useQuery } from '@wasp/queries'
import damage from '@wasp/actions/damage'

type UseCharacter = {
  character?: Character
  error: any
  isFetching: boolean
  create: (character: Pick<Character, 'name'>) => Promise<void>
  damageBody: ({
    component,
    amount,
  }: {
    component: 'head'
    amount: number
  }) => Promise<void>
}

export const useCharacter = (): UseCharacter => {
  const {
    data: character,
    error,
    isFetching,
  } = useQuery<{ id: number }, Character>(getCharacter)

  const create = async ({ name }: Pick<Character, 'name'>) => {
    try {
      await createCharacter({ name })
    } catch (err) {
      console.error(err)
    }
  }

  const damageBody = async ({
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

  // const healBody = () => {}

  return {
    character,
    error,
    isFetching,
    create,
    damageBody,
  }
}
