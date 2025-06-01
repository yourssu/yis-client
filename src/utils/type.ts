import { CamelCase } from 'type-fest/source/camel-case'

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type Mutable<T> =
  T extends ReadonlyArray<infer U>
    ? Array<Mutable<U>>
    : T extends Record<number | string | symbol, unknown>
      ? { -readonly [K in keyof T]: Mutable<T[K]> }
      : T

export type Merge<T, U> = Omit<T, keyof U> & U

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]
/**
 * union 타입에서 빈 객체를 제외시켜요.
 * @example
 * type Test = { a: 1 } | {} | { b: 2 };
 * type Result = ExcludeEmptyObject<Test>; // { a: 1 } | { b: 2 }
 */
export type ExcludeEmptyObject<T> = T extends AtLeastOne<T> ? T : never

export type ValueOf<T> = T[keyof T]

export type GetIndexedField<T, K> = K extends keyof T
  ? T[K]
  : K extends `${number}`
    ? 'length' extends keyof T
      ? number extends T['length']
        ? number extends keyof T
          ? T[number]
          : undefined
        : undefined
      : undefined
    : undefined

export type FieldWithPossiblyUndefined<T, Key> =
  | Extract<T, undefined>
  | GetFieldType<Exclude<T, undefined>, Key>

export type IndexedFieldWithPossiblyUndefined<T, Key> =
  | Extract<T, undefined>
  | GetIndexedField<Exclude<T, undefined>, Key>

export type GetFieldType<T, P> = P extends `${infer Left}.${infer Right}`
  ? Left extends keyof Exclude<T, undefined>
    ? Extract<T, undefined> | FieldWithPossiblyUndefined<Exclude<T, undefined>[Left], Right>
    : Left extends `${infer FieldKey}[${infer IndexKey}]`
      ? FieldKey extends keyof T
        ? FieldWithPossiblyUndefined<
            IndexedFieldWithPossiblyUndefined<T[FieldKey], IndexKey>,
            Right
          >
        : undefined
      : undefined
  : P extends keyof T
    ? T[P]
    : P extends `${infer FieldKey}[${infer IndexKey}]`
      ? FieldKey extends keyof T
        ? IndexedFieldWithPossiblyUndefined<T[FieldKey], IndexKey>
        : undefined
      : IndexedFieldWithPossiblyUndefined<T, P>

export type GetFieldTypeStrictly<T, P> =
  GetFieldType<T, P> extends undefined ? never : Prettify<GetFieldType<T, P>>

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never
type LastOf<T> =
  UnionToIntersection<T extends any ? () => T : never> extends () => infer R ? R : never

type Push<T extends any[], V> = [...T, V]

export type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> = true extends N
  ? []
  : Push<TuplifyUnion<Exclude<T, L>>, L>

export type StartsWith<T extends string, U extends string> = T extends `${U}${string}`
  ? true
  : false

/* 
  https://github.com/colinhacks/zod/issues/486
*/
export type CamelCasedPropertiesDeep<
  Value,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
> = Value extends Date | Function | RegExp
  ? Value
  : Value extends readonly unknown[]
    ? Value extends readonly [infer First, ...infer Rest]
      ? [CamelCasedPropertiesDeep<First>, ...CamelCasedPropertiesDeep<Rest>]
      : Value extends readonly []
        ? []
        : CamelCasedPropertiesDeep<Value[number]>[]
    : Value extends Set<infer U>
      ? Set<CamelCasedPropertiesDeep<U>>
      : Value extends object
        ? {
            [K in keyof Value as CamelCase<
              K & string,
              { preserveConsecutiveUppercase: true }
            >]: CamelCasedPropertiesDeep<Value[K]>
          }
        : Value

type OptionalizeValue<T> = T extends null ? undefined : T
export type OptionalizeDeep<
  Value,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
> = Value extends Date | Function | RegExp
  ? Value
  : Value extends readonly unknown[]
    ? Value extends readonly [infer First, ...infer Rest]
      ? [OptionalizeDeep<First>, ...OptionalizeDeep<Rest>]
      : Value extends readonly []
        ? []
        : OptionalizeDeep<Value[number]>[]
    : Value extends Set<infer U>
      ? Set<OptionalizeDeep<U>>
      : Value extends object
        ? {
            [K in keyof Value]: OptionalizeDeep<Value[K]>
          }
        : OptionalizeValue<Value>

export type NonGenericDeep<
  Value,
  MapValue,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
> = Value extends Date | Function | RegExp
  ? Value
  : Value extends readonly unknown[]
    ? Value extends readonly [infer First, ...infer Rest]
      ? [NonGenericDeep<First, MapValue>, ...NonGenericDeep<Rest, MapValue>]
      : Value extends readonly []
        ? []
        : NonGenericDeep<Value[number], MapValue>[]
    : Value extends Set<infer U>
      ? Set<NonGenericDeep<U, MapValue>>
      : Value extends object
        ? {
            [K in keyof Value]: NonGenericDeep<Value[K], MapValue>
          }
        : MapValue

const emptyObjectSymbol: unique symbol = Symbol('emptyObjectSymbol')
export type EmptyObjectType = { [emptyObjectSymbol]?: never }

export type If<TValue, TCondition> = TValue extends TCondition ? true : false

export type MergeIf<TCondition, TObject, TTrue, TFalse = EmptyObjectType> = Prettify<
  TCondition extends true ? Merge<TObject, TTrue> : Merge<TObject, TFalse>
>
