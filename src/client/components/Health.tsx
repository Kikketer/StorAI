import { FC } from 'react'
import styles from './health.module.css'
import { CharacterProps } from './CharacterWrap'

export const Health: FC<Pick<CharacterProps, 'damageBody' | 'character'>> = ({
  damageBody,
  character,
}) => {
  return (
    <div className={styles.output}>
      <pre>{JSON.stringify(character ?? {}, null, 2)}</pre>
      <button onClick={() => damageBody({ component: 'head', amount: 1 })}>
        Damage
      </button>
    </div>
  )
}

Health.displayName = 'Health'
