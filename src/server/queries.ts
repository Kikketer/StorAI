import HttpError from '@wasp/core/HttpError.js'

export const getCharacter = async (_args: any, context: any) => {
  if (!context.user) {
    throw new HttpError(401)
  }

  return context.entities.Character.findFirst({
    where: { user: { id: context.user.id } },
  })
}
