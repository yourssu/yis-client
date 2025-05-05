import { DefaultError, UseMutationResult } from '@tanstack/react-query'

export const useMutateWithResult = <
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(
  mutation: UseMutationResult<TData, TError, TVariables, TContext>
) => {
  const mutateWithResult = async (payload: TVariables) => {
    try {
      await mutation.mutateAsync(payload)
      return true
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
    } catch (e) {
      return false
    }
  }

  return { ...mutation, mutateWithResult }
}
