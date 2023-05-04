export type RawChatOutput = {
  id: string
  object: string
  created: number
  error?: {
    message: string
    type: string
  }
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
  choices: Array<{
    message: {
      role: 'assistant' | 'user' | 'system'
      content: string
    }
    finish_reason: string
    index: number
  }>
}

export type RawChatResponse = {
  roomDescription: string
  options: string[]
}

export type Theme = {
  backstory: string
  characters: string
  plot: string
  imageTheme: string
}
