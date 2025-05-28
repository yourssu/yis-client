import { mapValues } from 'es-toolkit'
import { set } from 'es-toolkit/compat'
import { useState } from 'react'
import { z } from 'zod/v4'

import { checkParsedError, getZodErrorMessage } from '@/utils/zod'

export const useZodFormValidation = <
  TValue extends Record<string, any>,
  TScheme extends z.ZodObject,
>(
  value: TValue,
  schema: TScheme
) => {
  const [invalid, setInvalid] = useState<Record<keyof TValue, boolean>>(
    mapValues(value, () => false)
  )
  const [invalidText, setInvalidText] = useState<string | undefined>(undefined)

  const getInitialInvalid = () => {
    return mapValues(value, () => false)
  }

  const getInvalid = (error: z.ZodError<TScheme>) => {
    const res = getInitialInvalid()
    error.issues.forEach((issue) => {
      const path = issue.path.join('.')
      const isError = checkParsedError(error, path)
      set(res, path, isError)
    })
    return res
  }

  const reset = () => {
    setInvalid(() => getInitialInvalid())
    setInvalidText(undefined)
  }

  const validate = () => {
    const { error } = schema.safeParse(value)

    if (error) {
      setInvalid(() => getInvalid(error))
      setInvalidText(getZodErrorMessage(error))
      return false
    }

    reset()
    return true
  }

  const onChangeWithReset = <TAmbiguous>(fn: (v: TAmbiguous) => void) => {
    return (v: TAmbiguous) => {
      reset()
      fn(v)
    }
  }

  return {
    invalid,
    invalidText,
    setInvalid,
    setInvalidText,
    reset,
    validate,
    onChangeWithReset,
  }
}
