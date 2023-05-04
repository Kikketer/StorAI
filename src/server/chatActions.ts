import fetch from 'node-fetch'
import { History } from '@wasp/entities'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from 'langchain/prompts'
import { LLMChain } from 'langchain/chains'
import { Theme } from '../shared/types'

export const parseRoomDescription = ({
  description,
}: {
  description: string
}): {
  description?: string
  imageDescription?: string
  error?: any
} => {
  // The room description actually comes back as a JSON object, so let's attempt to parse it!
  try {
    // const result: RawChatResponse = JSON.parse(description)
    const [room] = description?.split(/\n/) ?? []

    return {
      description,
      imageDescription: room,
    }
  } catch (err) {
    console.log(err)

    return {
      error: err,
    }
  }
}

export const generateRoom = async ({
  theme,
  description,
}: {
  theme: Theme
  history: History[]
  description: string
}): Promise<string> => {
  if (!description) return 'Error, no description'

  const system = `
  I want you to act as a text based adventure game. I will type commands and you will reply with a description of what the player character sees. I want you to only reply with the game output and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. Do not type any commands from the player unless I tell you otherwise. Every time the player would take an action, stop writing and wait for input. Do not make decisions for the player. Every time the player would make a decision, instead of continuing, stop and wait for player input. Every time you stop and wait for player input, provide a list of options as a list:
  What do you do?
  Option 1
  Option 2
  Option 3

  Backstory:
  ${theme.backstory}

  Characters:
  ${theme.characters}

  Adventure plot:
  ${theme.plot}
`

  const model = new ChatOpenAI({ temperature: 0.7 })

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(system),
    HumanMessagePromptTemplate.fromTemplate(description),
  ])

  const chain = new LLMChain({
    prompt: chatPrompt,
    llm: model,
  })

  const result = await chain.call({})

  return result.text
}

export const generateImage = async ({
  theme,
  description,
}: {
  theme: Theme
  description?: string
}): Promise<string> => {
  if (!description) return ''

  const resp = await fetch(
    'https://api.stability.ai/v1/generation/stable-diffusion-xl-beta-v2-2-2/text-to-image',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Stability-Client-ID': 'StorAI',
        Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: `${theme.imageTheme}, ${description}`,
            weight: 1,
          },
        ],
      }),
    }
  )

  if (!resp.ok) {
    throw new Error('Failed to generate image')
  }

  const json = (await resp.json()) as { artifacts: { base64: string }[] }
  return json?.artifacts[0]?.base64
}
