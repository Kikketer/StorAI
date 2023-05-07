import { useHistory } from 'react-router-dom'
import { useCharacter } from './hooks/useCharacter'
import { useEffect } from 'react'
import style from './createCharacter.module.css'

const CreateCharacter = () => {
  const history = useHistory()
  const { character, isLoading, create } = useCharacter()

  useEffect(() => {
    // Just go to the root if you already have a character
    if (!isLoading && character) history.replace('/')
  }, [isLoading, character])

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

  if (isLoading) return <div>Loading...</div>

  return (
    <div className={style.root}>
      <h1>Welcome</h1>
      <p>
        This application was a Wasp Lang hackathon submission and is entirely
        for my own education.
      </p>
      <p>
        You are going to be presented with a choose-your-own adventure style
        story. Feel free to ask and perform anything on each page.
      </p>
      <p>But first, you must give me the name of your character.</p>
      <form onSubmit={onSubmit as any}>
        <label>
          Character Name:
          <input type="text" name="characterName" />
        </label>
        <button type="submit">Create Character</button>
      </form>
    </div>
  )
}

CreateCharacter.displayName = 'CreateCharacter'

export default CreateCharacter
