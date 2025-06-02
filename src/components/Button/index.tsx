import clsx from 'clsx'
import { tv } from 'tailwind-variants'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'lg' | 'md' | 'sm'
  variant: 'primary' | 'secondary' | 'subPrimary' | 'transparent'
}

const button = tv({
  base: 'ease-ease cursor-pointer transition-colors duration-200 disabled:cursor-not-allowed',
  variants: {
    variant: {
      primary:
        '!text-neutral disabled:!text-neutralDisabled bg-brandPrimary hover:bg-brandHover focus:bg-brandActive active:bg-brandActive disabled:bg-brandDisabled',
      secondary:
        '!text-neutral disabled:!text-neutralDisabled bg-grey200 hover:bg-grey300 active:bg-grey400 focus:bg-grey400 disabled:bg-greyOpacity500',
      subPrimary:
        'bg-brandAdaptiveBg disabled:!text-brandDisabled !text-brandAdaptive hover:bg-brandAdaptiveBgHover focus:bg-brandAdaptiveBgActive active:bg-brandAdaptiveBgActive disabled:bg-brandAdaptiveBgDisabled',
      transparent:
        '!text-greyOpacity800 hover:bg-grey100 active:bg-grey200 focus:bg-grey200 disabled:!text-neutralDisabled bg-transparent disabled:bg-transparent',
    },
    size: {
      sm: 'rounded-lg px-4 py-1.5 text-sm font-medium',
      md: 'text-15 rounded-[10px] px-4 py-2 font-medium',
      lg: 'text-15 rounded-xl px-5.5 py-2.5 font-medium',
    },
  },
})

export const Button = ({ variant, size, children, className, ...props }: ButtonProps) => {
  const buttonStyle = button({ variant, size })

  return (
    <button className={clsx(buttonStyle, className)} {...props}>
      {children}
    </button>
  )
}
