import { useHistory } from 'react-router-dom'
import { useCharacter } from './hooks/useCharacter'
import { useEffect } from 'react'

const CreateCharacter = () => {
  const history = useHistory()
  const { character, isFetching, create } = useCharacter()

  useEffect(() => {
    // Just go to the root if you already have a character
    if (!isFetching && character) history.replace('/')
  }, [isFetching, character])

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

  if (isFetching) return <div>Loading...</div>

  return (
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
  )
}

CreateCharacter.displayName = 'CreateCharacter'

export default CreateCharacter
