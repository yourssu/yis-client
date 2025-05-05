import { createContext } from 'react'

export type ToastType = 'error' | 'success'

export type ToastItem = {
  id: string
  text: string
  type: ToastType
}

interface ToastContextProps {
  addToast: (props: { text: string; type: ToastType }) => void
  toasts: ToastItem[]
}

export const ToastContext = createContext<ToastContextProps>({
  toasts: [],
  addToast: () => {},
})
