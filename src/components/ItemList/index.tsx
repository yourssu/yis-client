import { Divider } from '@/components/Divider'
import { InlineButton } from '@/components/InlineButton'

const Header = ({
  children,
  sideContent,
}: React.PropsWithChildren<{ sideContent?: React.ReactNode }>) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pb-3">
        <div className="text-xl font-bold">{children}</div>
        {sideContent && (
          <InlineButton asChild className="text-neutralSubtle !text-15">
            {sideContent}
          </InlineButton>
        )}
      </div>
      <Divider className="mb-2" />
    </div>
  )
}

const Body = ({ children }: React.PropsWithChildren<unknown>) => {
  return <div className="flex w-full flex-col">{children}</div>
}

const Item = ({ children, label }: React.PropsWithChildren<{ label: string }>) => {
  return (
    <div className="text-15 flex w-full items-center justify-between py-2">
      <div className="text-neutralMuted">{label}</div>
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
