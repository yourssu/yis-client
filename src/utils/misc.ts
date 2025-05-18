import { omitBy } from 'es-toolkit'
import { get, values } from 'es-toolkit/compat'

import { GetFieldTypeStrictly, Mutable, Prettify, TuplifyUnion } from '@/utils/type'

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

export const tupleValues = <T extends object>(obj: null | T | undefined) => {
  const res = values(obj)
  return res as unknown as Readonly<TuplifyUnion<(typeof res)[number]>>
}
