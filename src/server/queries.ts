import HttpError from '@wasp/core/HttpError.js'
import { Character, History } from '@wasp/entities'

export const getCharacter = async (
  _args: any,
  context: any
): Promise<{ character?: Character; currentRoom?: History }> => {
  if (!context.user) {
    throw new HttpError(401)
  }

  const character = await context.entities.Character.findFirst({
    where: { user: { id: context.user.id }, active: true },
  })

  let currentRoom

  if (character) {
    currentRoom = (
      await context.entities.History.findMany({
        where: { character: { id: character.id } },
        orderBy: { id: 'desc' },
        take: 1,
      })
    )?.[0]
  }

  return { character, currentRoom }
}
