import * as env from 'dotenv'
import { doSomething } from './serverUtils'
import { generateImage } from '../shared/chatActions'

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
  { command }: { command: string },
  context: any
) => {
  if (context.user) {
    console.log('Sending a command ', command)
    await doSomething()
    await generateImage({ description: command })
  }
}
