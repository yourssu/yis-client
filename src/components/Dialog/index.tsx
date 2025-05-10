import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import { MdClose } from 'react-icons/md'
import { Merge } from 'type-fest'

import { ButtonProps, Button as StyledButton } from '@/components/Button'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface DialogProps {
  closeableWithOutside?: boolean
  contentProps?: DialogPrimitive.DialogContentProps
  onClose: () => void
  open: boolean
}

const Header = ({
  children,
  onClickCloseButton,
}: React.PropsWithChildren<{ onClickCloseButton?: () => void }>) => {
  return (
    <div className="flex w-full">
      <div className="w-full px-6 pt-5">{children}</div>
      {onClickCloseButton && (
        <div className="pt-5 pr-3.5">
          <button
            className="hover:bg-grey200 active:bg-grey300 focus:bg-grey300 ease-ease inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors duration-200"
            onClick={onClickCloseButton}
          >
            <MdClose className="text-neutralSubtle size-5" />
          </button>
        </div>
      )}
    </div>
  )
}

const Title = ({ children }: React.PropsWithChildren<unknown>) => {
  return <div className="text-xl font-semibold">{children}</div>
}

const Content = ({ children, className }: React.PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={clsx('flex max-w-[720px] flex-col px-6 pt-5 pb-5', className)}>{children}</div>
  )
}

const ButtonGroup = ({ children }: React.PropsWithChildren<unknown>) => {
  return <div className="flex w-full justify-end gap-3 px-6 pb-5">{children}</div>
}

const Button = ({
  className,
  size = 'md',
  children,
  ...props
}: Merge<ButtonProps, { size?: ButtonProps['size'] }>) => {
  return (
    <StyledButton className={clsx('rounded-lg px-9 py-2', className)} size={size} {...props}>
      {children}
    </StyledButton>
  )
}

export const Dialog = ({
  onClose,
  open,
  closeableWithOutside,
  children,
  contentProps = {},
}: React.PropsWithChildren<DialogProps>) => {
  const onCloseWithOutside = (e: Event) => {
    if (!closeableWithOutside) {
      e.preventDefault()
    }
  }

  return (
    <DialogPrimitive.Root onOpenChange={(v) => !v && onClose()} open={open}>
      <AnimatePresence>
        {open && (
          // forceMount: 이게 있어야 exit 애니메이션이 제대로 작동해요.
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay className="fixed inset-0" />
            <DialogPrimitive.Content
              {...contentProps}
              className="fixed top-1/2 left-1/2 -translate-1/2"
              onInteractOutside={onCloseWithOutside}
              onPointerDownOutside={onCloseWithOutside}
            >
              <motion.div
                animate="animate"
                className="bg-grey100 shadow-dialog rounded-2xl will-change-transform"
                exit="initial"
                initial="initial"
                transition={{
                  duration: 0.25,
                  ease: [0.25, 0.1, 0.25, 1], // timing-function: ease
                }}
                variants={{
                  initial: { opacity: 0, scale: 0.7 },
                  animate: { opacity: 1, scale: 1 },
                }}
              >
                <VisuallyHidden>
                  <DialogPrimitive.Title />
                  <DialogPrimitive.Description />
                  <DialogPrimitive.Close />
                </VisuallyHidden>
                {children}
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  )
}

Dialog.Header = Header
Dialog.Content = Content
Dialog.Title = Title
Dialog.ButtonGroup = ButtonGroup
Dialog.Button = Button
