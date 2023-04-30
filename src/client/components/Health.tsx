import { FC } from 'react'
import styles from './health.module.css'
import { CharacterProps } from './CharacterWrap'

export const Health: FC<Pick<CharacterProps, 'damageBody' | 'character'>> = ({
  damageBody,
  character,
}) => {
  const healthItems = Object.keys(character ?? {}).reduce(
    (acc: any, attribute) => {
      const name = attribute.match(/^health_(.*)/)
      if (attribute.match(/^health/)) {
        acc.push({ name: name?.[1], value: character?.[attribute] })
      }

      return acc
    },
    []
  )

  return (
    <div className={styles.output}>
      <ul>
        {healthItems.map((healthItem) => (
          <li>
            {healthItem.name}: {healthItem.value}
          </li>
        ))}
      </ul>
      <button onClick={() => damageBody({ component: 'head', amount: 1 })}>
        Damage
      </button>
    </div>
  )
}

Health.displayName = 'Health'
