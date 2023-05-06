import { ReactElement, useState, FC } from 'react'
import styles from './input.module.css'
import { ChatProps } from './ChatWrap'

export const Input: FC<Pick<ChatProps, 'sendCommand' | 'options'>> = ({
  sendCommand,
  options,
}): ReactElement => {
  const [loading, setLoading] = useState(false)

  const send = async (command: string) => {
    try {
      setLoading(true)
      await sendCommand({ command })
      setLoading(false)
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

  // TS-BS... basic stuff like "submit a form" is very hard to find the proper event type
  const onSay = async (e: SubmitEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // TS-BS why do I always have to cast like this...
    const target = e.target as HTMLFormElement
    const command = target.input.value

    // Clear the input and send the value!
    target.input.value = ''
    return send(command)
  }

  const useOption = async (option: string) => {
    return send(option)
  }

  return (
    <div className={styles.root}>
      <form onSubmit={onSay as any}>
        <div>
          {options?.map((option) => (
            <button type="button" onClick={() => useOption(option)}>
              {option}
            </button>
          ))}
        </div>
        <input
          className={styles.input}
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
