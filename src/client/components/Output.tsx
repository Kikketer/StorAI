import { ReactElement } from 'react'
import styles from './output.module.css'

type OutputProps = {
  description?: string
}

export const Output = ({ description }: OutputProps): ReactElement => {
  return (
    <div className={styles.output}>
      <p>{description ?? 'You are lost...'}</p>
    </div>
  )
}

Output.displayName = 'Output'
