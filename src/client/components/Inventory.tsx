import { ReactElement } from 'react'
import { Character } from '../types'

type InventoryProps = {
  inventory?: Pick<Character, 'inventory'>
}

export const Inventory = ({ inventory }: InventoryProps): ReactElement => {
  return (
    <div>
      <pre>{JSON.stringify(inventory ?? {}, null, 2)}</pre>
    </div>
  )
}

Inventory.displayName = 'Inventory'
