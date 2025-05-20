import { createContext } from 'react'

interface DetailListContextProps {
  selectedId: number | undefined
  setSelectedId: React.Dispatch<React.SetStateAction<number | undefined>>
}

export const DetailListContext = createContext<DetailListContextProps>({
  selectedId: undefined,
  setSelectedId: () => {},
})
