import React, { createContext, ReactNode, useContext, useMemo } from 'react'

export type ChatProps = {
  sendCommand: (T: { command: string }) => Promise<void>
}

type ChatBase = {
  children: (T: ChatProps) => ReactNode
}

type ChatContextProps = {}

const ChatContext = createContext<ChatContextProps | null>(null)

const sendCommand = async ({ command }: { command: string }) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  console.log('Command sent ', command)
}

const ChatProvider = ({ children }: ChatBase): JSX.Element => {
  const availableAttributes = useMemo(() => {
    return {
      sendCommand,
    }
  }, [])

  return (
    <ChatContext.Provider value={availableAttributes}>
      {children({ sendCommand })}
    </ChatContext.Provider>
  )
}

const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext)
  if (!context) throw new Error('useChat must be used within a ChatProvider')
  return context
}

ChatProvider.displayName = 'ChatProvider'

export { useChat, ChatProvider }
