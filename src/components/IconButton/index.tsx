import clsx from 'clsx'
import { tv } from 'tailwind-variants'

import { HoverTooltip } from '@/components/HoverTooltip'

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement
  size: 'lg' | 'md' | 'sm'
  tooltipContent?: React.ReactNode
}

const button = tv({
  base: 'hover:bg-grey100 foucs:bg-grey200 active:bg-grey200 disabled:bg-grey200 disabled:text-neutralDisabled ease-ease flex cursor-pointer items-center justify-center transition-colors duration-200 disabled:cursor-not-allowed',
  variants: {
    size: {
      sm: 'rounded-sm p-1.5',
      md: 'rounded-md p-2',
      lg: 'rounded-lg p-3',
    },
  },
})

export const IconButton = ({
  children,
  size,
  className,
  tooltipContent,
  ...props
}: IconButtonProps) => {
  const renderedButton = (
    <button className={clsx(button({ size }), className)} {...props}>
      {children}
    </button>
  )

  if (tooltipContent) {
    return (
      <HoverTooltip
        color="grey200"
        content={tooltipContent}
        contentProps={{
          side: 'bottom',
          sideOffset: 2,
          className: '!py-1 !px-2',
        }}
        disableHoverableContent
        noArrow
      >
        {renderedButton}
      </HoverTooltip>
    )
  }
  return renderedButton
}
