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
  return (
    <div className={styles.output}>
      <p>{description || `Welcome ${characterName}`}</p>
    </div>
  )
}

Output.displayName = 'Output'
