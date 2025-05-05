import clsx from 'clsx'
import { SetStateAction, useContext, useState } from 'react'

import { PopoverContext } from '@/components/Popover/context'
import { usePopoverBehavior } from '@/components/Popover/hook'
import { PopoverBehaviorType } from '@/components/Popover/type'
import * as PrimivtivePopover from '@radix-ui/react-popover'
import { Slot } from '@radix-ui/react-slot'

export interface PopoverProps {
  behavior?: PopoverBehaviorType
  onOpenChange?: (v: boolean) => void
}

interface ContentProps extends PrimivtivePopover.PopoverContentProps {
  onCloseWithOutside?: () => void
}

const Content = ({
  children,
  className,
  sideOffset,
  onCloseWithOutside,
  ...props
}: React.PropsWithChildren<ContentProps>) => {
  const { onPointerEnter, onPointerLeave } = usePopoverBehavior()

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    props.onClick?.(e)
  }

  return (
    <PrimivtivePopover.Portal>
      <PrimivtivePopover.Content
        className="z-[500] outline-none"
        {...props}
        onClick={onClick}
        onCloseAutoFocus={onCloseWithOutside}
        onEscapeKeyDown={onCloseWithOutside}
        onFocusOutside={onCloseWithOutside}
        onInteractOutside={onCloseWithOutside}
        onPointerDownOutside={onCloseWithOutside}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        {sideOffset && <div style={{ height: sideOffset }} />}
        <div className={clsx('z-10', className)}>{children}</div>
      </PrimivtivePopover.Content>
    </PrimivtivePopover.Portal>
  )
}

const Trigger = ({ children, className }: React.PropsWithChildren<{ className?: string }>) => {
  const { onClick, onPointerEnter, onPointerLeave } = usePopoverBehavior()

  return (
    <PrimivtivePopover.Trigger
      className={clsx('outline-none', className)}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      tabIndex={-1}
    >
      {children}
    </PrimivtivePopover.Trigger>
  )
}

export const Closeable = ({
  children,
  asChild,
}: React.PropsWithChildren<{ asChild?: boolean }>) => {
  const Comp = asChild ? Slot : 'div'

  const { setOpen } = useContext(PopoverContext)
  return <Comp onClick={() => setOpen(false)}>{children}</Comp>
}

export const Popover = ({
  children,
  behavior = 'click',
  onOpenChange,
}: React.PropsWithChildren<PopoverProps>) => {
  const [open, setOpen] = useState(false)

  const setOpenWrapper = (v: SetStateAction<boolean>) => {
    if (typeof v === 'function') {
      const next = v(open)
      onOpenChange?.(next)
      setOpen(() => next)
    } else {
      onOpenChange?.(v)
      setOpen(v)
    }
  }

  return (
    <PopoverContext.Provider value={{ behavior, open, setOpen: setOpenWrapper }}>
      <PrimivtivePopover.Root onOpenChange={(v) => setOpenWrapper(v)} open={open}>
        {children}
      </PrimivtivePopover.Root>
    </PopoverContext.Provider>
  )
}

Popover.Target = Trigger
Popover.Content = Content
Popover.Closeable = Closeable
