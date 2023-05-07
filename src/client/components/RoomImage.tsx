import { ReactElement } from 'react'
import styles from './roomImage.module.css'
import computer from '../img/ComputerBG.png'
import { Actions } from './Actions'
import { Screen } from './Screen'

type RoomImageProps = {
  image64?: string
  loading?: boolean
}

export const RoomImage = ({
  image64,
  loading,
}: RoomImageProps): ReactElement => {
  return (
    <div className={styles.root} style={{ backgroundImage: computer }}>
      <div className={styles.computer}></div>
      <Screen image64={image64} loading={loading} />
      <Actions />
    </div>
  )
}

RoomImage.displayName = 'RoomImage'
