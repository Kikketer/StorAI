import { ReactElement } from 'react'
import { Character } from '../types'
import styles from './health.module.css'
import { useCharacter } from '../providers/Character.context'

export const Health = () => {
  const { character, getHit } = useCharacter()

  return (
    <div className={styles.output}>
      <pre>
        {/*{JSON.stringify(health ?? {}, null, 2)}*/}
        {JSON.stringify(character ?? {}, null, 2)}
      </pre>
      <button onClick={() => getHit({ component: 'head', amount: 1 })}>
        Damage
      </button>
    </div>
  )
}

Health.displayName = 'Health'
