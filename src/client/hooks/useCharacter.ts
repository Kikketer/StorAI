import { Character, History } from '@wasp/entities'
import getCharacter from '@wasp/queries/getCharacter'
import createCharacter from '@wasp/actions/createCharacter'
import { useQuery } from '@wasp/queries'
import damage from '@wasp/actions/damage'

type UseCharacter = {
  character?: Character
  currentRoom?: History
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
  const { data, error, isFetching } = useQuery<
    { id: number },
    { character: Character; currentRoom: History }
  >(getCharacter)

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
      if (data) {
        await damage({ id: data.character.id, component, amount })
      }
    } catch (err) {
      console.error(err)
    }
  }

  // const healBody = () => {}

  console.log('Got character', data)

  return {
    character: data?.character,
    currentRoom: data?.currentRoom,
    error,
    isFetching,
    create,
    damageBody,
  }
}
