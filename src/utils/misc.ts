import { omitBy } from 'es-toolkit'

import { Mutable, Prettify } from '@/utils/type'

export function mutable<T>(v: T) {
  return v as Prettify<Mutable<T>>
}

export function omitByNullish<T extends Record<string, any>>(obj: T): Partial<T> {
  return omitBy(obj, (v) => v === null || v === undefined)
}
