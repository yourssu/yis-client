import { createContext, Dispatch, SetStateAction } from 'react'

import { PopoverBehaviorType } from '@/components/Popover/type'

type PopoverContextType = {
  behavior: PopoverBehaviorType
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const PopoverContext = createContext<PopoverContextType>({
  behavior: 'click',
  open: false,
  setOpen: () => {},
})
