import HttpError from '@wasp/core/HttpError.js'

export const getCharacter = async (_args: any, context: any) => {
  if (!context.user) {
    throw new HttpError(401)
  }

  const character = context.entities.Character.findFirst({
    where: { user: { id: context.user.id } },
  })

  const currentRoom = context.entities.History.findMany({
    where: { character: { id: character.id } },
    orderBy: { id: 'desc' },
    take: 1,
  })?.[0]

  return { character, currentRoom }
}
