import * as env from 'dotenv'
import {
  generateImage,
  generateRoom,
  parseRoomDescription,
} from './chatActions.js'

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
): Promise<{ image: string; description: string } | void> => {
  if (context.user) {
    // Get the current character
    const character = await context.entities.Character.findFirst({
      where: { user: { id: context.user.id } },
    })
    if (!character) return { image: '', description: '' }

    const room = await generateRoom({ description: command })
    const parsedRoomDescription = parseRoomDescription({ description: room })
    const image = await generateImage({
      description: parsedRoomDescription?.imageDescription,
    })
    // Save the resulting image to the database
    await context.entities.Character.updateMany({
      where: { id: character.id, user: { id: context.user.id } },
      data: {
        room_image: image,
        room_description: parsedRoomDescription?.description,
      },
    })

    return { image, description: room }
  }
}
