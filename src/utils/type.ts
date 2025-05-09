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
