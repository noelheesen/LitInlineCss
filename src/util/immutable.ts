const immutable = <T extends Record<string, unknown>>(obj: T): Readonly<T> =>
  Object.freeze(obj)

export default immutable
