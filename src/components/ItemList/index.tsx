import { RxQuestionMarkCircled } from 'react-icons/rx'

import { Divider } from '@/components/Divider'
import { HoverTooltip } from '@/components/HoverTooltip'
import { InlineButton } from '@/components/InlineButton'

const Header = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pb-3 text-xl font-bold">{children}</div>
      <Divider className="mb-2" />
    </div>
  )
}

const HeaderButton = ({
  children,
  onClick,
}: React.PropsWithChildren<{ onClick?: React.MouseEventHandler }>) => {
  return (
    <InlineButton className="text-neutralSubtle !text-15 font-normal" onClick={onClick}>
      {children}
    </InlineButton>
  )
}

const Body = ({ children }: React.PropsWithChildren<unknown>) => {
  return <div className="flex w-full flex-col">{children}</div>
}

const Item = ({
  children,
  label,
  tooltipContent,
}: React.PropsWithChildren<{ label: string; tooltipContent?: string }>) => {
  return (
    <div className="text-15 flex w-full items-center justify-between py-2">
      <div className="text-neutralMuted flex items-center gap-1">
        <div>{label}</div>
        {tooltipContent && (
          <HoverTooltip content={tooltipContent} contentProps={{ side: 'bottom' }}>
            <RxQuestionMarkCircled />
          </HoverTooltip>
        )}
      </div>
      <div className="font-medium">{children}</div>
    </div>
  )
}

export const ItemList = ({ children }: React.PropsWithChildren<unknown>) => {
  return <div className="flex w-full flex-col">{children}</div>
}

ItemList.Header = Header
ItemList.Body = Body
ItemList.Item = Item
ItemList.HeaderButton = HeaderButton
