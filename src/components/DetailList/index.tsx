import clsx from 'clsx'
import { LayoutGroup, motion } from 'motion/react'
import React, { useState } from 'react'

import { createDetailListContext, useDetailListContext } from '@/components/DetailList/context'

interface DetailListProps<TTab extends string> {
  componentId: string
  defaultSelectedId?: number
  defaultTab: TTab
  onTabChange: (value: TTab) => void
  tabs: TTab[]
}

interface ListItemProps {
  description: string
  footer: React.ReactNode
  header: React.ReactNode
  id: number
  onClick?: (p: { close: boolean }) => void
  text: string
}

interface DeatilProps {
  children: (p: { id: number }) => React.ReactNode
}

const Detail = ({ children }: DeatilProps) => {
  const { selectedId } = useDetailListContext()

  const active = selectedId !== undefined
  const renderTarget = active && children({ id: selectedId })

  return (
    <motion.div
      animate={renderTarget ? 'animate' : 'initial'}
      className="overflow-hidden"
      transition={{
        type: 'spring',
        damping: 50,
        stiffness: 500,
      }}
      variants={{
        initial: { flex: '0 1', marginLeft: 0, minWidth: '0px' },
        animate: { flex: '300 1', marginLeft: 10, minWidth: '300px' },
      }}
    >
      {renderTarget && (
        <div className="border-grey200 size-full min-w-[400px] border-l-1 p-5">{renderTarget}</div>
      )}
    </motion.div>
  )
}

const List = ({ children }: React.PropsWithChildren<unknown>) => {
  return <div className="flex flex-[400_1] flex-col pt-2.5">{children}</div>
}

const ListItem = ({ id, text, description, footer, header, onClick }: ListItemProps) => {
  const { selectedId, setSelectedId } = useDetailListContext()

  return (
    <div
      className={clsx(
        'hover:bg-grey100 ease-ease flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors duration-300',
        selectedId === id && 'bg-grey50'
      )}
      onClick={() => {
        onClick?.({ close: selectedId !== id })
        setSelectedId((prev) => (prev === id ? undefined : id))
      }}
    >
      <div className="flex items-center gap-5">
        <div>{header}</div>
        <div>
          <div className="text-15 text-neutralMuted mb-0.5 font-semibold">{text}</div>
          <div className="text-neutralSubtle text-sm">{description}</div>
        </div>
      </div>
      <div>{footer}</div>
    </div>
  )
}

export const DetailList = <TTab extends string>({
  children,
  tabs,
  defaultTab,
  componentId,
  defaultSelectedId,
  onTabChange,
}: React.PropsWithChildren<DetailListProps<TTab>>) => {
  const [tab, setTab] = useState<TTab>(defaultTab)
  const [selectedId, setSelectedId] = useState<number | undefined>(defaultSelectedId)

  const Context = createDetailListContext<TTab>()
  return (
    <Context.Provider
      value={{
        onTabChange,
        selectedId,
        setSelectedId,
        setTab,
        tab,
      }}
    >
      <div className="w-full">
        <LayoutGroup id={componentId}>
          <div className="border-grey200 flex w-full gap-5 border-b-[1px]">
            {tabs.map((item) => (
              <div
                className="relative w-fit py-2.5"
                key={item}
                onClick={() => {
                  setTab(item)
                  setSelectedId(undefined)
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
        <div className="flex">{children}</div>
      </div>
    </Context.Provider>
  )
}

DetailList.List = List
DetailList.Detail = Detail
DetailList.ListItem = ListItem
