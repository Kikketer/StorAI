import * as env from 'dotenv'
import fetch from 'node-fetch'

env.config()

const defaultHealth = {
  health_head: 10,
  health_body: 10,
  health_leftArm: 10,
  health_rightArm: 10,
  health_leftLeg: 10,
  health_rightLeg: 10,
}

export const damage = (
  { id, component, amount }: { id: number; component: 'head'; amount: number },
  context: any
) => {
  if (context.user) {
    return context.entities.Character.updateMany({
      where: { id, user: { connect: { id: context.user.id } } },
      data: {
        [`health_${component}`]: 0,
      },
    })
  }
}

export const createCharacter = ({ name }: { name: string }, context: any) => {
  if (context.user) {
    return context.entities.Character.create({
      data: {
        name,
        ...defaultHealth,
        user: { connect: { id: context.user.id } },
      },
    })
  }
}

export const sendCommand = async (
  { characterId, command }: { characterId: number; command: string },
  context: any
): Promise<{ image: string } | void> => {
  if (context.user) {
    // Get the current character
    // const character = await context.entities.Character.findFirst({
    //   where: { user: { id: context.user.id } },
    // })
    // const image = await generateImage({ description: command })
    // Save the resulting image to the database
    await context.entities.Character.updateMany({
      where: { id: characterId, user: { connect: { id: context.user.id } } },
      data: {
        room_image: '...',
      },
    })

    return { image: '...' }
  }
}

const generateImage = async ({
  description: _description,
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
            text: 'dungeons and dragons, battlemap, overhead view, combat grid, square grid, single room, a table in the center of the room, statues around the edges of the room, 8k, high resolution',
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
