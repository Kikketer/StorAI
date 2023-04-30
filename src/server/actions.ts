export const damage = (
  { id, component, amount }: { id: number; component: 'head'; amount: number },
  context: any
) => {
  return context.entities.Character.update({
    where: { id },
    data: {
      [`health_${component}`]: 0,
    },
  })
}
