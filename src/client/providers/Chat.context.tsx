import React, { createContext, ReactNode, useContext, useMemo } from 'react'

type ChatBase = {
  children: ReactNode
}

type ChatContextProps = {
  chat: (input: string) => Promise<string>
}

const ChatContext = createContext<ChatContextProps | null>(null)

const chat = async (_input: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return 'Yep you asked me something...'
}

const ChatProvider = ({ children }: ChatBase): JSX.Element => {
  const availableAttributes = useMemo(() => {
    return {
      chat,
    }
  }, [chat])

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
