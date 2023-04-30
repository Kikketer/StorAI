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
  return context.entities.Character.updateMany({
    where: { id, user: { connect: { id: context.user.id } } },
    data: {
      [`health_${component}`]: 0,
    },
  })
}

export const createCharacter = ({ name }: { name: string }, context: any) => {
  return context.entities.Character.create({
    data: {
      name,
      ...defaultHealth,
      user: { connect: { id: context.user.id } },
    },
  })
}
