export const getCharacter = async ({ id }: { id: number }, context: any) => {
  return context.entities.Character.findFirst({
    where: { id },
  })
}
