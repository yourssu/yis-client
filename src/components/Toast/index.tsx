import { tv } from 'tailwind-variants'

import { ToastType } from '@/components/Providers/ToastProvider/context'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const lottie = tv({
  variants: {
    type: {
      error: 'mr-1 size-7',
      success: 'size-9',
      default: 'h-9 w-0',
    },
  },
})

export const Toast = ({ children, type }: React.PropsWithChildren<{ type: ToastType }>) => {
  const src = (() => {
    switch (type) {
      case 'error':
        return '/error.lottie'
      case 'success':
        return '/success.lottie'
      default:
        return undefined
    }
  })()

  return (
    <div className="bg-grey100 flex items-center rounded-xl py-2 pr-5.5 pl-3 font-semibold text-white">
      <div className="flex size-9 items-center justify-center">
        <div className={lottie({ type })}>
          {!!src && <DotLottieReact autoplay loop={false} speed={1.5} src={src} />}
        </div>
      </div>

      {children}
    </div>
  )
}
