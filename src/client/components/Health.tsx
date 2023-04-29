import { ReactElement } from 'react'
import { Character } from '../types'
import styles from './health.module.css'

type HealthProps = {
  health?: Pick<Character, 'health'>
}

export const Health = ({ health }: HealthProps): ReactElement => {
  return (
    <div>
      <pre className={styles.output}>
        {JSON.stringify(health ?? {}, null, 2)}
      </pre>
    </div>
  )
}

Health.displayName = 'Health'
