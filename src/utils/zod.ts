import camelcaseKeys from 'camelcase-keys'
import { get } from 'es-toolkit/compat'
import { z } from 'zod/v4'

import { CamelCasedPropertiesDeep, OptionalizeDeep } from '@/utils/type'

type StringLiteral<T> = T extends string ? (string extends T ? never : T) : never

type LiteralOrFallback<TUnion extends readonly string[], TFallback extends string> =
  | TFallback
  | TUnion[number]

export const camelizeSchema = <T extends z.ZodType>(
  zod: T
): z.ZodPipe<T, z.ZodTransform<CamelCasedPropertiesDeep<z.output<T>>, z.output<T>>> =>
  zod.transform(
    (val) =>
      camelcaseKeys(val as Record<string, unknown>, { deep: true }) as CamelCasedPropertiesDeep<T>
  )

export const optionalizeSchema = <T extends z.ZodType>(
  zod: T
): z.ZodPipe<T, z.ZodTransform<OptionalizeDeep<T['_output']>, T['_output']>> => {
  const nullToUndefinedDeep = <T>(obj: T): T => {
    if (obj === null) {
      return undefined as any
    }
    if (Array.isArray(obj)) {
      return obj.map((item) => nullToUndefinedDeep(item)) as any
    }
    if (obj instanceof Set) {
      const newSet = new Set<any>()
      for (const item of obj) {
        newSet.add(nullToUndefinedDeep(item))
      }
      return newSet as any
    }
    if (typeof obj === 'object') {
      const result: any = {}
      for (const [key, value] of Object.entries(obj)) {
        if (value === null) {
          result[key] = undefined
        } else {
          result[key] = nullToUndefinedDeep(value)
        }
      }
      return result
    }
    return obj as any
  }
  return zod.transform((val) => nullToUndefinedDeep(val) as OptionalizeDeep<T>)
}

export const getZodErrorsIn = <TScheme extends object, TPath extends string = string>(
  error: z.ZodError<TScheme>,
  path: TPath
) => {
  const errorTree = z.treeifyError(error)
  const errorTreePath = 'properties.' + path.split('.').join('.properties.')
  const value = get(errorTree, errorTreePath) as undefined | z.core.$ZodErrorTree<unknown>
  return value?.errors
}

export const checkParsedError = <TScheme extends object, TPath extends string = string>(
  error: undefined | z.ZodError<TScheme>,
  path: TPath
) => {
  if (!error) {
    return false
  }
  return !!getZodErrorsIn(error, path)?.length
}

export const isZodError = (e: any): e is z.ZodError =>
  e instanceof z.ZodError && e.name === 'ZodError'

export const getZodErrorMessage = (error: z.ZodError) => {
  return error.issues[0]?.message
}

export const ambiguousZodEnum = <
  T extends string,
  TFallback extends string & {},
  TUnion extends Readonly<[T, ...T[]]>,
>(
  union: TUnion,
  fallback: ((v: string) => TFallback) | TFallback
) => {
  const enumSchema = z.enum(union)
  const fallbackFn = typeof fallback === 'function' ? fallback : () => fallback

  const schema = z
    .string()
    .transform((v) => (union.includes(v as any) ? v : fallbackFn(v)))
    .pipe(
      z.union([
        enumSchema,
        z
          .string()
          .refine((v) => !union.includes(v as any), {
            message: 'fallback이 union과 값이 겹쳐요.',
          })
          .transform((v) => fallbackFn(v)),
      ])
    )

  return schema as unknown as z.ZodType<
    StringLiteral<LiteralOrFallback<TUnion, ReturnType<typeof fallbackFn>>>
  >
}

export const zodISODateString = () =>
  z.string().transform((v) => {
    const checkResultIsValidDate = (date: string) => {
      return !isNaN(new Date(date).getTime())
    }
    const isofiedDate = v.endsWith('Z') ? v : `${v.replace('+00:00', '')}Z`
    return checkResultIsValidDate(isofiedDate) ? isofiedDate : v
  })
