import { RoomImage } from './components/RoomImage'
import { Health } from './components/Health'
import styles from './mainPage.module.css'
import { Inventory } from './components/Inventory'
import { Output } from './components/Output'
import { Input } from './components/Input'
import { ChatProvider } from './providers/Chat.context'

const MainPage = () => {
  return (
    <ChatProvider>
      <div className={styles['main-container']}>
        <RoomImage />
        <Health />
        <Inventory />
        <Output />
        <Input />
      </div>
    </ChatProvider>
  )
}
export default MainPage
