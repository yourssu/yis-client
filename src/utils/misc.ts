import { omitBy } from 'es-toolkit'
import { get } from 'es-toolkit/compat'

import { GetFieldTypeStrictly, Mutable, Prettify } from '@/utils/type'

export function mutable<T>(v: T) {
  return v as Prettify<Mutable<T>>
}

export function omitByNullish<T extends Record<string, any>>(obj: T): Partial<T> {
  return omitBy(obj, (v) => v === null || v === undefined)
}

export const getIn = <TObject, TPath extends string = string>(
  object: TObject,
  path: TPath
): GetFieldTypeStrictly<TObject, TPath> => {
  return get(object, path as string)
}
