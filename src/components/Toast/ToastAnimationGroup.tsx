import { AnimatePresence, motion } from 'motion/react'
import { createPortal } from 'react-dom'

import { useToastContext } from '@/components/Providers/ToastProvider/hook'
import { Toast } from '@/components/Toast'

const variants = {
  hidden: (index: number) => ({ opacity: 0, scale: 0.9, x: '-50%', y: index * 80 + 48 }),
  visible: (index: number) => ({ opacity: 1, scale: 1, x: '-50%', y: index * 80 + 48 }),
}

export const ToastAnimationGroup = () => {
  const { toasts } = useToastContext()

  return createPortal(
    <AnimatePresence>
      {toasts.map(({ id, text, type }, index) => {
        return (
          <motion.div
            animate="visible"
            className="fixed top-0 left-1/2 z-50"
            custom={toasts.length - index - 1}
            exit="hidden"
            initial="hidden"
            key={id}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            variants={variants}
          >
            <Toast type={type}>{text}</Toast>
          </motion.div>
        )
      })}
    </AnimatePresence>,
    document.body
  )
}
