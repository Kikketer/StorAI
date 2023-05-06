import { ReactElement } from 'react'
import styles from './output.module.css'

type OutputProps = {
  characterName?: string
  description?: string | null
}

export const Output = ({
  description,
  characterName,
}: OutputProps): ReactElement => {
  // Split the description on newlines and map each line to a paragraph
  const lines = description?.split(/\n/) ?? []
  let justDescription = ''
  const options =
    lines?.filter((line) => {
      if (line.trim().match(/^\d/)) {
        return true
      }
      justDescription += line
    }) ?? []

  console.log('otpions: ', options)

  return (
    <div className={styles.output}>
      <p>{justDescription ?? `Welcome ${characterName}`}</p>
      <ul>
        {options.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>
    </div>
  )
}

Output.displayName = 'Output'
