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

  return (
    <div className={styles.output}>
      <div>
        {lines?.length
          ? lines.map((line, index) => <p key={index}>{line}</p>)
          : `Welcome ${characterName}`}
      </div>
    </div>
  )
}

Output.displayName = 'Output'
