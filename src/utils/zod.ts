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
  U extends string,
  T extends Readonly<[U, ...U[]]>,
  TFallback extends string,
>(
  val: T,
  fallback: TFallback
) => {
  return z
    .string()
    .transform((val) => (val.includes(val as any) ? val : fallback))
    .pipe(z.union([z.enum(val), z.literal(fallback)]))
}

export const zodISODateString = () =>
  z.string().transform((v) => {
    const checkResultIsValidDate = (date: string) => {
      return !isNaN(new Date(date).getTime())
    }
    const isofiedDate = v.endsWith('Z') ? v : `${v}Z`
    return checkResultIsValidDate(isofiedDate) ? isofiedDate : v
  })
