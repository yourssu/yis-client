import { LayoutGroup, motion } from 'motion/react'
import { useId, useState } from 'react'

interface TabProps<TTab extends string> {
  children: (p: { tab: TTab }) => React.ReactNode
  defaultTab: TTab
  onTabChange: (value: TTab) => void
  tabs: TTab[]
}

export const Tab = <TTab extends string>({
  defaultTab,
  onTabChange,
  tabs,
  children,
}: TabProps<TTab>) => {
  const id = useId()
  const [tab, setTab] = useState(defaultTab)

  return (
    <div className="w-full">
      <LayoutGroup id={id}>
        <div className="border-grey200 flex w-full gap-5 border-b-[1px]">
          {tabs.map((item) => (
            <div
              className="relative w-fit py-2.5"
              key={item}
              onClick={() => {
                setTab(item)
                onTabChange(item)
              }}
            >
              <span className="text-15 cursor-pointer font-medium">{item}</span>
              {item === tab && (
                <motion.div
                  className="absolute bottom-0 h-0.5 w-full bg-white"
                  layoutId="tab-indicator"
                  transition={{
                    duration: 0.25,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </LayoutGroup>
      {children({ tab })}
    </div>
  )
}
