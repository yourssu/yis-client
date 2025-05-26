import camelcaseKeys from 'camelcase-keys'
import { type CamelCase } from 'type-fest'
import { z } from 'zod'

type CamelCaseOptions = {
  preserveConsecutiveUppercase?: boolean
}

/* 
  https://github.com/colinhacks/zod/issues/486
*/
type CamelCasedPropertiesDeep<
  Value,
  Options extends CamelCaseOptions = { preserveConsecutiveUppercase: true },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
> = Value extends Date | Function | RegExp
  ? Value
  : Value extends readonly unknown[]
    ? Value extends readonly [infer First, ...infer Rest]
      ? [CamelCasedPropertiesDeep<First, Options>, ...CamelCasedPropertiesDeep<Rest, Options>]
      : Value extends readonly []
        ? []
        : CamelCasedPropertiesDeep<Value[number], Options>[]
    : Value extends Set<infer U>
      ? Set<CamelCasedPropertiesDeep<U, Options>>
      : Value extends object
        ? {
            [K in keyof Value as CamelCase<K & string, Options>]: CamelCasedPropertiesDeep<
              Value[K],
              Options
            >
          }
        : Value

type StringLiteral<T> = T extends string ? (string extends T ? never : T) : never

type LiteralOrFallback<TUnion extends readonly string[], TFallback extends string> =
  | TFallback
  | TUnion[number]

export const camelizeSchema = <T extends z.ZodTypeAny>(
  zod: T
): z.ZodEffects<z.infer<T>, CamelCasedPropertiesDeep<T['_output']>> =>
  zod.transform((val) => camelcaseKeys(val, { deep: true }) as CamelCasedPropertiesDeep<T>)

export const checkParsedError = <TScheme extends object>(
  error: undefined | z.ZodError<TScheme>,
  field: keyof TScheme
) => {
  return !!error?.formErrors.fieldErrors[field]?.length
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
