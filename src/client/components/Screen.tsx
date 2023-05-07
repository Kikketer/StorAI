import { ReactElement } from 'react'
import styles from './roomImage.module.css'
import imageDefault from '../img/defaultImage'

type ScreenProps = {
  image64?: string
  loading?: boolean
}

export const Screen = ({ image64, loading }: ScreenProps) => {
  const result64 = loading ? imageDefault : image64 || imageDefault

  return (
    <img
      className={styles.image}
      alt="room"
      src={`data:image/png;base64,${result64}`}
    />
  )
}

Screen.displayName = 'Screen'
