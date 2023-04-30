import { FC } from 'react'
import styles from './health.module.css'
import { CharacterProps } from '../providers/Character.context'

export const Health: FC<Pick<CharacterProps, 'getHit' | 'character'>> = ({
  getHit,
  character,
}) => {
  return (
    <div className={styles.output}>
      <pre>{JSON.stringify(character ?? {}, null, 2)}</pre>
      <button onClick={() => getHit({ component: 'head', amount: 1 })}>
        Damage
      </button>
    </div>
  )
}

Health.displayName = 'Health'
