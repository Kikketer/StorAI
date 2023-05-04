import { ReactElement } from 'react'
import styles from './output.module.css'

type OutputProps = {
  characterName?: string
  description?: string
}

export const Output = ({
  description,
  characterName,
}: OutputProps): ReactElement => {
  // Split the description on newlines and map each line to a paragraph
  const lines = description?.split(/\n/) ?? []

  return (
    <div className={styles.output}>
      <p>
        {lines?.length
          ? lines.map((line) => <p>{line}</p>)
          : `Welcome ${characterName}`}
      </p>
    </div>
  )
}

Output.displayName = 'Output'
