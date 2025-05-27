export const preventSuspenseRequest = <T>({ fallback }: { fallback: T }) => {
  return () => fallback
}
