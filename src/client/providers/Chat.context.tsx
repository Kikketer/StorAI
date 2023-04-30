import React, { createContext, ReactNode, useContext, useMemo } from 'react'

type ChatBase = {
  children: ReactNode
}

type ChatContextProps = {}

const ChatContext = createContext<ChatContextProps | null>(null)

const ChatProvider = ({ children }: ChatBase): JSX.Element => {
  const availableAttributes = useMemo(() => {
    return {}
  }, [])

  return (
    <ChatContext.Provider value={availableAttributes}>
      {children}
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
