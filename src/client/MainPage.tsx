import { RoomImage } from './components/RoomImage'
import styles from './mainPage.module.css'
import { Output } from './components/Output'
import { Input } from './components/Input'
import { CharacterWrap } from './components/CharacterWrap'
import { ChatWrap } from './components/ChatWrap'

const MainPage = () => {
  return (
    <CharacterWrap>
      {({ character, currentRoom }) => (
        <ChatWrap>
          {({ description, options, sendCommand, image }) => (
            <div className={styles['main-container']}>
              <RoomImage image64={currentRoom?.room_image ?? image} />
              <Output
                characterName={character?.name}
                description={description || currentRoom?.room_description}
              />
              <Input options={options} sendCommand={sendCommand} />
            </div>
          )}
        </ChatWrap>
      )}
    </CharacterWrap>
  )
}
export default MainPage
