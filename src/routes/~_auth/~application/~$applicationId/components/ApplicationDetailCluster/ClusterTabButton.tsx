import clsx from 'clsx'

import { Button } from '@/components/Button'

interface ClusterTabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
}

export const ClusterTabButton = ({ selected, children, ...props }: ClusterTabButtonProps) => {
  return (
    <Button
      className={clsx('text-left', selected && '!bg-greyOpacity100')}
      size="md"
      variant="transparent"
      {...props}
    >
      {children}
    </Button>
  )
}
