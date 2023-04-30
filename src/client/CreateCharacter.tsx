import createCharacter from '@wasp/actions/createCharacter'
import { useHistory } from 'react-router-dom'
import {
  CharacterProps,
  CharacterProvider,
} from './providers/Character.context'

const useCreateCharacter = () => {
  return {
    create: createCharacter,
  }
}

const CreateCharacter = () => {
  const history = useHistory()
  const { create } = useCreateCharacter()

  const onReady = ({ character }: CharacterProps) => {
    // If we already have a character, redirect
    if (character) {
      history.replace('/')
    }
  }

  const onSubmit = async (e: Event) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      await create({ name: (e.target as HTMLFormElement).characterName.value })
      history.replace('/')
    } catch (err) {
      console.error(err)
    }

    return false
  }

  return (
    <CharacterProvider onReady={onReady}>
      {() => (
        <>
          <h1>Create Your Character</h1>
          <form onSubmit={onSubmit as any}>
            <label>
              Character Name:
              <input type="text" name="characterName" />
            </label>
            <button type="submit">Create Character</button>
          </form>
        </>
      )}
    </CharacterProvider>
  )
}

CreateCharacter.displayName = 'CreateCharacter'

export default CreateCharacter
