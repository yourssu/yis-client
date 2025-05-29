import clsx from 'clsx'

import { vars } from '@/styles/__generated__/color.gen'
import * as Tooltip from '@radix-ui/react-tooltip'

interface Props {
  color?: Extract<keyof typeof vars, `grey${string}`>
  content: React.ReactNode
  contentProps?: React.ComponentProps<typeof Tooltip.Content>
  disableHoverableContent?: boolean
  noArrow?: boolean
}

export const HoverTooltip = ({
  children,
  content,
  color,
  contentProps,
  noArrow,
  disableHoverableContent,
}: React.PropsWithChildren<Props>) => {
  const { className, sideOffset, ...otherContentProps } = contentProps ?? {}

  return (
    <Tooltip.Provider
      delayDuration={0}
      disableHoverableContent={disableHoverableContent}
      skipDelayDuration={0}
    >
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            {...otherContentProps}
            className={clsx('bg-grey100 text-13 z-20 max-w-[400px] rounded-lg p-4', className)}
            sideOffset={sideOffset ?? 10}
            style={{
              backgroundColor: color && vars[color],
            }}
          >
            {!noArrow && (
              <Tooltip.Arrow
                className="fill-grey100"
                style={{
                  fill: color && vars[color],
                }}
              />
            )}
            {content}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
