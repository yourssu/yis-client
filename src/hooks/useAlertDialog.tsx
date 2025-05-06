import { overlay } from 'overlay-kit'
import React from 'react'

import { Dialog } from '@/components/Dialog'

interface OverlayProps {
  closeAsFalse: () => void
  closeAsTrue: () => void
  isOpen: boolean
}

interface UseAlertDialogOpenProps {
  closeableWithOutside?: boolean
  closeButton?: boolean
  content: ((props: OverlayProps) => React.ReactNode) | React.ReactNode
  title: string
}

export const useAlertDialog = () => {
  const open = async ({
    closeButton,
    title,
    content,
    closeableWithOutside,
  }: UseAlertDialogOpenProps) =>
    await overlay.openAsync<boolean>(({ isOpen, close }) => {
      const closeAsTrue = () => close(true)
      const closeAsFalse = () => close(false)

      return (
        <Dialog closeableWithOutside={closeableWithOutside} onClose={closeAsFalse} open={isOpen}>
          <Dialog.Header onClickCloseButton={closeButton ? closeAsFalse : undefined}>
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>
          {typeof content === 'function' ? content({ isOpen, closeAsTrue, closeAsFalse }) : content}
        </Dialog>
      )
    })

  return open
}
