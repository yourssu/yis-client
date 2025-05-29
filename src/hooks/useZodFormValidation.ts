import { mapValues } from 'es-toolkit'
import { get, isObjectLike, set } from 'es-toolkit/compat'
import { useState } from 'react'
import { z } from 'zod/v4'

import { NonGenericDeep } from '@/utils/type'
import { getZodErrorMessage } from '@/utils/zod'

type StringOptionalDeep<T> = NonGenericDeep<T, string | undefined>

/**
  주의: invalidTexts 값은 원본 스키마의 구조를 유지하기 위해 배열이나 객체의 에러는 감지하지 않아요. 스키마를 구성할 때 주의해주세요.
*/
export const useZodFormValidation = <
  TValue extends Record<string, any>,
  TScheme extends z.ZodObject,
>(
  value: TValue,
  schema: TScheme
) => {
  const getInitialInvalidTexts = () => {
    return mapValues(value, () => undefined) as StringOptionalDeep<TValue>
  }

  const [invalidMessage, setInvalidMessage] = useState<string | undefined>(undefined)
  const [invalidTexts, setInvalidTexts] =
    useState<StringOptionalDeep<TValue>>(getInitialInvalidTexts())

  const getInvalidTexts = (error: z.ZodError<TScheme>) => {
    const res = getInitialInvalidTexts()
    error.issues.forEach((issue) => {
      const path = issue.path.join('.')
      const target = get(res, path)
      if (!isObjectLike(target)) {
        set(res, path, issue.message)
      }
    })
    return res
  }

  const reset = () => {
    setInvalidTexts(() => getInitialInvalidTexts())
    setInvalidMessage(undefined)
  }

  const validate = () => {
    const { error } = schema.safeParse(value)

    if (error) {
      setInvalidTexts(() => getInvalidTexts(error))
      setInvalidMessage(getZodErrorMessage(error))
      return {
        success: false,
        error,
      } as const
    }

    reset()
    return {
      success: true,
    } as const
  }

  const onChangeWithReset = <TAmbiguous>(fn: (v: TAmbiguous) => void) => {
    return (v: TAmbiguous) => {
      reset()
      fn(v)
    }
  }

  return {
    invalidTexts,
    invalidMessage,
    setInvalidTexts,
    setInvalidMessage,
    reset,
    validate,
    onChangeWithReset,
  }
}
