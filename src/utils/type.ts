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
