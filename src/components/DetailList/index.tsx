import clsx from 'clsx'
import { motion } from 'motion/react'
import React, { useContext, useState } from 'react'

import { DetailListContext } from '@/components/DetailList/context'

interface DetailListProps {
  defaultSelectedId?: number
}

interface ListItemProps {
  description: React.ReactNode
  footer: React.ReactNode
  header: React.ReactNode
  id: number
  onClick?: (p: { close: boolean }) => void
  text: React.ReactNode
}

interface DeatilProps {
  children: (p: { id: number }) => React.ReactNode
}

const Detail = ({ children }: DeatilProps) => {
  const { selectedId } = useContext(DetailListContext)

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
        <div className="border-grey200 size-full min-w-[400px] border-l-1 p-5 pb-20">
          {renderTarget}
        </div>
      )}
    </motion.div>
  )
}

const List = ({ children }: React.PropsWithChildren<unknown>) => {
  return <div className="flex flex-[400_1] flex-col pt-2.5">{children}</div>
}

const ListItem = ({ id, text, description, footer, header, onClick }: ListItemProps) => {
  const { selectedId, setSelectedId } = useContext(DetailListContext)

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
      {footer}
    </div>
  )
}

export const DetailList = ({
  children,
  defaultSelectedId,
}: React.PropsWithChildren<DetailListProps>) => {
  const [selectedId, setSelectedId] = useState<number | undefined>(defaultSelectedId)

  return (
    <DetailListContext.Provider
      value={{
        selectedId,
        setSelectedId,
      }}
    >
      <div className="flex w-full">{children}</div>
    </DetailListContext.Provider>
  )
}

DetailList.List = List
DetailList.Detail = Detail
DetailList.ListItem = ListItem
