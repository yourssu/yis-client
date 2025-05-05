import clsx from 'clsx'

import { Popover, PopoverProps } from '@/components/Popover'

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
        tabIndex={0}
        {...props}
      >
        {children}
      </button>
    </Popover.Closeable>
  )
}

export const Menu = ({ children, ...props }: React.PropsWithChildren<PopoverProps>) => {
  return <Popover {...props}>{children}</Popover>
}

Menu.Target = Popover.Target
Menu.Content = Popover.Content
Menu.ButtonItem = ButtonItem
