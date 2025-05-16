import { once } from 'es-toolkit'
import { createContext, useContext } from 'react'

interface DetailListContextProps<TTab extends string> {
  onTabChange: (value: TTab) => void
  selectedIndex: number | undefined
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | undefined>>
  setTab: React.Dispatch<React.SetStateAction<TTab>>
  tab: TTab
}

export const createDetailListContext = once(<TTab extends string>() =>
  createContext<DetailListContextProps<TTab>>({
    onTabChange: () => {},
    selectedIndex: undefined,
    setSelectedIndex: () => {},
    setTab: () => {},
    tab: '' as TTab,
  })
)

export const useDetailListContext = <TTab extends string>() => {
  return useContext(createDetailListContext<TTab>())
}
