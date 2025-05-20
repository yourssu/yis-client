import { LayoutGroup, motion } from 'motion/react'
import { useId, useState } from 'react'

interface ChipTabProps<TTab extends string> {
  children: (p: { tab: TTab }) => React.ReactNode
  defaultTab: TTab
  onTabChange: (value: TTab) => void
  tabs: TTab[]
}

export const ChipTab = <TTab extends string>({
  defaultTab,
  onTabChange,
  tabs,
  children,
}: ChipTabProps<TTab>) => {
  const id = useId()
  const [tab, setTab] = useState(defaultTab)

  return (
    <div className="w-full">
      <LayoutGroup id={id}>
        <div className="flex w-full">
          {tabs.map((item) => {
            return (
              <div
                className="text-15 relative cursor-pointer rounded-full px-3 py-1"
                key={item}
                onClick={() => {
                  setTab(item)
                  onTabChange(item)
                }}
              >
                {tab === item && (
                  <motion.div
                    className="bg-grey100 absolute top-0 left-0 -z-10 size-full rounded-full"
                    layoutId="chip-tab-indicator"
                  />
                )}
                <span>{item}</span>
              </div>
            )
          })}
        </div>
      </LayoutGroup>
      {children({ tab })}
    </div>
  )
}
