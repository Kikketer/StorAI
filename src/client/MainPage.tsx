import { RoomImage } from './components/RoomImage'
import { Health } from './components/Health'
import styles from './mainPage.module.css'
import { Inventory } from './components/Inventory'
import { Output } from './components/Output'
import { Input } from './components/Input'
import { CharacterWrap } from './components/CharacterWrap'
import { ChatWrap } from './components/ChatWrap'

const MainPage = () => {
  return (
    <CharacterWrap>
      {({ character, damageBody }) => (
        <ChatWrap>
          {({ sendCommand, image }) => (
            <div className={styles['main-container']}>
              <RoomImage image64={image} />
              <Health damageBody={damageBody} character={character} />
              <Inventory />
              <Output />
              <Input sendCommand={sendCommand} />
            </div>
          )}
        </ChatWrap>
      )}
    </CharacterWrap>
  )
}
export default MainPage
