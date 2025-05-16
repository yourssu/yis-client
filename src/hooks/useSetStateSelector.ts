import { set } from 'es-toolkit/compat'
import { produce } from 'immer'
import { Dispatch, SetStateAction, useCallback } from 'react'

import { getIn } from '@/utils/misc'
import { GetFieldTypeStrictly } from '@/utils/type'

export const useSetStateSelector = <
  TObject extends object,
  TPath extends string = string,
  TValue = GetFieldTypeStrictly<TObject, TPath>,
>(
  setValue: Dispatch<SetStateAction<TObject>>,
  path: TPath
) => {
  const result: Dispatch<SetStateAction<TValue>> = useCallback(
    (update) => {
      setValue((prevValue) =>
        produce(prevValue, (draft) => {
          set(
            draft,
            path,
            typeof update === 'function'
              ? (update as (prvValue: TValue) => TValue)(getIn(draft, path) as TValue)
              : update
          )
        })
      )
    },
    [path, setValue]
  )
  return result
}
