import { ReactElement } from 'react'
import styles from './roomImage.module.css'
import computer from '../img/ComputerBG.png'
import { Actions } from './Actions'

type RoomImageProps = {
  image64?: string
}

export const RoomImage = ({ image64 }: RoomImageProps): ReactElement => {
  console.log('image? ', image64?.length)
  return (
    <div className={styles.root} style={{ backgroundImage: computer }}>
      <div className={styles.computer}></div>
      {image64 ? (
        <img
          className={styles.image}
          alt="room"
          src={`data:image/png;base64,${image64}`}
        />
      ) : (
        'You are lost'
      )}
      <Actions />
    </div>
  )
}

RoomImage.displayName = 'RoomImage'
