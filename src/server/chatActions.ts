import { History } from '@wasp/entities'
import { RawChatOutput, RawChatResponse } from '../shared/types'
import fetch from 'node-fetch'

export const parseRoomDescription = ({
  description,
}: {
  description: string
}): { description: string; options: string[]; imageDescription: string } => {
  // The room description actually comes back as a JSON object, so let's attempt to parse it!
  try {
    const result: RawChatResponse = JSON.parse(description)

    return {
      description: result.roomDescription,
      options: result.options,
      imageDescription: result.roomDescription,
    }
  } catch (err) {
    console.log(err)

    return {
      description: `Ooops: ${err}`,
      options: [],
      imageDescription: 'A broken image',
    }
  }
}

export const generateRoom = async ({
  history,
  description,
}: {
  history: History[]
  description?: string
}) => {
  const flattenedHistory = history
    .map((historyItem) => {
      return [
        {
          role: 'user',
          content: historyItem.command,
        },
        {
          role: 'assistant',
          content: historyItem.room_description,
        },
      ]
    })
    .reduce((acc, val) => acc.concat(val), [])

  const chatMessage = JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `
        I want you to act as a text based adventure game. I will type commands and you will reply with a description of what the player character sees. I want you to only reply with the game output and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. Do not type any commands from the player. Every time the player would take an action, stop writing and wait for input. Do not make decisions for the player. Every time the player would make a decision, instead of continuing, stop and wait for player input. Please return all of your responses in JSON format. The room descriptions should be in an attribute called 'roomDescription'. Every time you stop and wait for player input, provide a list of options in the JSON attribute 'options'. For example { "roomDescription": "The room is dark", "options": ["Open the door", "Take the flashlight", "Turn on the lights"].
        
        Backstory:
        You are a new crew member on the USS Buttknuckle. The USS Buttknuckle is a cargo ship en route to a mining colony in an asteroid belt. The Unified Galactic Government (UGG) is engaged in a war with space pirates, who call themselves “The Unheard”. The pirates are vicious and will stop at nothing to get what they want.
        
        Characters:
        The leaders of the ship are Cal and Gus, two space entrepreneurs with a secret criminal past. Cal is witty and sarcastic, but strong willed and clever. Gus is serious, but funny, and a good person. The shipboard AI of the USS Buttknuckle is named Susana, and she is very sarcastic, but follows orders.
        
        Adventure plot:
        The story should gradually increase in intensity, climaxing in a pirate attack on the USS Buttknuckle.`,
      },
      ...flattenedHistory,
      {
        role: 'user',
        content: description,
      },
    ],
  })

  console.log('ChatMessage ', chatMessage)

  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: chatMessage,
  })

  const json = (await resp.json()) as RawChatOutput

  if (!resp.ok) {
    throw new Error(json?.error?.message)
  }

  return json.choices?.[0]?.message.content
}

export const generateImage = async ({
  description,
}: {
  description: string
}): Promise<string> => {
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
            text: description,
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
