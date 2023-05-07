import { FC } from 'react'
import styles from './output.module.css'

type OutputProps = {
  characterName?: string
  description?: string | null
  loading?: boolean
}

export const Output: FC<{
  description?: string | null
  loading?: boolean
  characterName?: string
}> = ({ description, characterName, loading }: OutputProps) => {
  // Split the description on newlines and map each line to a paragraph
  const lines = description?.split(/\n/) ?? []
  let justDescription = ''
  const options =
    lines?.filter((line) => {
      if (line.trim().match(/(option)?\s?\d/i)) {
        return true
      }
      justDescription += line
    }) ?? []

  if (loading) {
    return <div>loading......</div>
  }

  return (
    <div className={styles.output}>
      <p>
        {justDescription ||
          `Welcome ${characterName}. You are asleep, try typing "Wake Up" and hit enter.`}
      </p>
      <ul>
        {options.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>
    </div>
  )
}

Output.displayName = 'Output'
