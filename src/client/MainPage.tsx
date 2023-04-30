import { RoomImage } from './components/RoomImage'
import { Health } from './components/Health'
import styles from './mainPage.module.css'
import { Inventory } from './components/Inventory'
import { Output } from './components/Output'
import { Input } from './components/Input'
import { ChatProvider } from './providers/Chat.context'
import { CharacterWrap } from './components/CharacterWrap'

const MainPage = () => {
  return (
    <CharacterWrap>
      {({ character, damageBody }) => (
        <ChatProvider>
          {({ sendCommand }) => (
            <div className={styles['main-container']}>
              <RoomImage />
              <Health damageBody={damageBody} character={character} />
              <Inventory />
              <Output />
              <Input sendCommand={sendCommand} />
            </div>
          )}
        </ChatProvider>
      )}
    </CharacterWrap>
  )
}
export default MainPage
