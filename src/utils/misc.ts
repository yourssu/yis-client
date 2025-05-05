import { Mutable, Prettify } from '@/utils/type'

export function mutable<T>(v: T) {
  return v as Prettify<Mutable<T>>
}
