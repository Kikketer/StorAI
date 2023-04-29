import { ReactElement } from 'react'

type OutputProps = {
  statement?: string
}

export const Output = ({ statement }: OutputProps): ReactElement => {
  return (
    <div>
      <p>{statement ?? 'You are lost...'}</p>
    </div>
  )
}

Output.displayName = 'Output'
