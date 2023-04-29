import { ReactElement } from 'react'
import styles from './roomImage.module.css'

type RoomImageProps = {
  image64?: string
}

export const RoomImage = ({ image64 }: RoomImageProps): ReactElement => {
  return (
    <div className={styles['room-image']}>
      {image64 ? (
        <img alt="The room" src={`data:image/png;base64,${image64}`} />
      ) : (
        'You are lost'
      )}
    </div>
  )
}

RoomImage.displayName = 'RoomImage'
