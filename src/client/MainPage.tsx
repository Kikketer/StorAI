import { RoomImage } from './components/RoomImage'
import { Health } from './components/Health'
import styles from './mainPage.module.css'
import { Inventory } from './components/Inventory'
import { Output } from './components/Output'
import { Input } from './components/Input'
import { ChatProvider } from './providers/Chat.context'
import { CharacterProvider } from './providers/Character.context'

const MainPage = () => {
  return (
    <CharacterProvider>
      {({ character, getHit }) => (
        <ChatProvider>
          {({ sendCommand }) => (
            <div className={styles['main-container']}>
              <RoomImage />
              <Health getHit={getHit} character={character} />
              <Inventory />
              <Output />
              <Input sendCommand={sendCommand} />
            </div>
          )}
        </ChatProvider>
      )}
    </CharacterProvider>
  )
}
export default MainPage
