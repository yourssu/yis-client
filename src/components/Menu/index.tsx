import clsx from 'clsx'

import { Popover, PopoverProps } from '@/components/Popover'
import { PopoverContentProps } from '@radix-ui/react-popover'

const ButtonItem = ({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <Popover.Closeable asChild>
      <button
        className={clsx(
          'hover:bg-grey200 active:hover:bg-grey300 focus:bg-grey300 ease-ease w-full cursor-pointer transition-colors duration-200',
          className
        )}
        {...props}
      >
        {children}
      </button>
    </Popover.Closeable>
  )
}

const Content = ({ children, ...props }: PopoverContentProps) => {
  return (
    <Popover.Content
      {...props}
      onOpenAutoFocus={(e) => {
        e.preventDefault()
      }}
    >
      {children}
    </Popover.Content>
  )
}

export const Menu = ({ children, ...props }: React.PropsWithChildren<PopoverProps>) => {
  return <Popover {...props}>{children}</Popover>
}

Menu.Target = Popover.Target
Menu.Content = Content
Menu.ButtonItem = ButtonItem
