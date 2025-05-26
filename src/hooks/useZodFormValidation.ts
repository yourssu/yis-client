import { mapValues } from 'es-toolkit'
import { useState } from 'react'
import { z } from 'zod'

import { getZodErrorMessage } from '@/utils/zod'

export const useZodFormValidation = <
  TValue extends Record<string, any>,
  TSchema extends z.AnyZodObject,
>(
  value: TValue,
  schema: TSchema
) => {
  const [invalid, setInvalid] = useState<Record<keyof TValue, boolean>>(
    mapValues(value, () => false)
  )
  const [invalidText, setInvalidText] = useState<string | undefined>(undefined)

  const reset = () => {
    setInvalid(() => mapValues(value, () => false))
    setInvalidText(undefined)
  }

  const validate = () => {
    const { error } = schema.safeParse(value)

    if (error) {
      const { fieldErrors } = error.formErrors
      setInvalid(() => mapValues(value, (_, k) => !!fieldErrors[k]))
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
    setInvalidText,
    reset,
    validate,
    onChangeWithReset,
  }
}
