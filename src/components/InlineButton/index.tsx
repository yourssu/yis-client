import clsx from 'clsx'

import { Slot } from '@radix-ui/react-slot'

interface InlineButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const InlineButton = ({ className, children, ...props }: InlineButtonProps) => {
  const Comp = props.asChild ? Slot : 'button'

  return (
    <Comp
      className={clsx(
        'hover:bg-grey100 focus:bg-grey100 active:bg-grey200 ease-ease inline-block cursor-pointer rounded-md px-1.5 transition-colors duration-200',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}
