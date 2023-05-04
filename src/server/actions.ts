import * as env from 'dotenv'
import {
  generateImage,
  generateRoom,
  parseRoomDescription,
} from './chatActions.js'
import spaceTheme from './starter_space.js'

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
      where: { id, user: { id: context.user.id } },
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
  { command }: { command: string },
  context: any
): Promise<{
  image?: string
  description: string
  error?: any
} | void> => {
  if (context.user) {
    // Get the current character
    const character = await context.entities.Character.findFirst({
      where: { user: { id: context.user.id } },
    })
    if (!character) return { image: '', description: '' }

    console.log('history', context.entities)

    // Get the last 5 room descriptions history
    const roomHistory = await context.entities.History.findMany({
      where: { character: { id: character.id } },
      orderBy: { created_at: 'desc' },
      take: 5,
    })

    const room = await generateRoom({
      theme: spaceTheme,
      history: roomHistory ?? [],
      description: command?.trim() || 'Wake Up',
    })
    const parsedRoomDescription = parseRoomDescription({ description: room })

    const image = await generateImage({
      theme: spaceTheme,
      description: parsedRoomDescription?.imageDescription,
    })

    // Save the resulting image and room to the database in a rolling history
    await context.entities.History.create({
      data: {
        command: command?.trim() || 'Wake Up',
        room_image: image,
        room_description: parsedRoomDescription?.description,
        raw_response: room,
        character: { connect: { id: character.id } },
      },
    })

    return {
      image,
      description: room,
    }
  }

  return undefined
}
