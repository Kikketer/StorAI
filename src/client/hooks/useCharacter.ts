import { Character, History } from '@wasp/entities'
import getCharacter from '@wasp/queries/getCharacter'
import createCharacter from '@wasp/actions/createCharacter'
import { useQuery } from '@wasp/queries'

type UseCharacter = {
  character?: Character
  currentRoom?: History
  error: any
  isFetching: boolean
  isLoading: boolean
  create: (character: Pick<Character, 'name'>) => Promise<void>
}

export const useCharacter = (): UseCharacter => {
  const { data, error, isFetching, isLoading } = useQuery<
    { id: number },
    { character?: Character; currentRoom?: History }
  >(getCharacter)

  const create = async ({ name }: Pick<Character, 'name'>) => {
    try {
      await createCharacter({ name })
    } catch (err) {
      console.error(err)
    }
  }

  return {
    character: data?.character,
    currentRoom: data?.currentRoom,
    error,
    isFetching,
    isLoading,
    create,
  }
}
