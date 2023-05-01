import { RawChatOutput } from '../shared/types'
import fetch from 'node-fetch'

export const parseRoomDescription = ({
  description,
}: {
  description: string
}): { description: string; options: string[]; imageDescription: string } => {
  const cleanedDescription = description?.match(/%(.*)%/)?.[1] ?? ''
  let options = description?.match(/\{What.*}(.*)\{Something.*}/)?.[1] ?? ''
  const imageDescription = cleanedDescription

  // remove new lines
  options = options.replace(/\\n/g, '')
  // split into array of options
  let optionList = options.split(/Option \d:/)
  // remove any empty strings
  optionList = optionList.filter((option) => option !== '')
  // remove whitespace
  optionList = optionList.map((option) => option.trim())

  return {
    description: cleanedDescription,
    options: optionList,
    imageDescription,
  }
}

export const generateRoom = async ({
  description,
}: {
  description?: string
}) => {
  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'I want you to act as a text based adventure game. I will type commands and you will reply with a description of what the player character sees. I want you to only reply with the game output and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. Do not type any commands from the player unless I tell you otherwise. When I need to give you instructions that are not player commands, I will do so by putting text inside curly brackets {like this}. Treat any text I put inside brackets {like this} as instructions for you and not player input in the game. Every time the player would take an action, stop writing and wait for input. Do not make decisions for the player. Every time the player would make a decision, instead of continuing, stop and wait for player input. When you describe the scene please surround that text with a % sign. When you describe a room it would be surrounded by % signs like this: %The room is incredibly dark%. Every time you stop and wait for player input, provide a list of options as a list that always ends with { something else } like this:\n' +
            '\n' +
            '{ What do you do? }\n' +
            '\n' +
            'Option 1\n' +
            'Option 2\n' +
            'Option 3\n' +
            '{ Something else }\n' +
            'Backstory:\n' +
            '\n' +
            'You are a new crew member on the USS Buttknuckle. The USS Buttknuckle is a cargo ship en route to a mining colony in an asteroid belt. The Unified Galactic Government (UGG) is engaged in a war with space pirates, who call themselves “The Unheard”. The pirates are vicious and will stop at nothing to get what they want.\n' +
            '\n' +
            'Characters:\n' +
            '\n' +
            'The leaders of the ship are Cal and Gus, two space entrepreneurs with a secret criminal past. Cal is witty and sarcastic, but strong willed and clever. Gus is serious, but funny, and a good person. The shipboard AI of the USS Buttknuckle is named Susana, and she is very sarcastic, but follows orders.\n' +
            '\n' +
            'Adventure plot:\n' +
            '\n' +
            'The story should gradually increase in intensity, climaxing in a pirate attack on the USS Buttknuckle.\n',
        },
        {
          role: 'user',
          content: description || 'Wake up',
        },
      ],
    }),
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
