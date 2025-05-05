import { Popover, PopoverProps } from '@/components/Popover'

const ButtonItem = ({
  children,
  ...props
}: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <Popover.Closeable>
      <button {...props}>{children}</button>
    </Popover.Closeable>
  )
}

export const Menu = ({ children, ...props }: React.PropsWithChildren<PopoverProps>) => {
  return <Popover {...props}>{children}</Popover>
}

Menu.Target = Popover.Target
Menu.Content = Popover.Content
Menu.ButtonItem = ButtonItem
