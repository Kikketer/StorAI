import { ReactElement, useState } from 'react'
import styles from './input.module.css'
import { useChat } from '../providers/Chat.context'

export const Input = (): ReactElement => {
  const { chat } = useChat()
  const [loading, setLoading] = useState(false)

  // TS-BS... basic stuff like "submit a form" is very hard to find the proper event type
  const onSay = async (e: SubmitEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setLoading(true)

    // TS-BS why do I always have to cast like this...
    const target = e.target as HTMLFormElement

    try {
      target.input.value = ''

      await chat((e.target as HTMLFormElement).input.value)
      setLoading(false)
    } catch (err) {
      console.error(err)
    }

    return false
  }

  return (
    <div className={styles.input}>
      <form onSubmit={onSay as any}>
        <input
          name="input"
          aria-label="What would you like to do?"
          placeholder="What would you like to do?"
          type="text"
          disabled={loading}
        />
        <button className={styles.hidden} type="submit">
          Send
        </button>
      </form>
    </div>
  )
}

Input.displayName = 'Input'