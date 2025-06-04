import { handleError } from '@/utils/error'
import { DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query'

export const useMutateWithResult = <
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(
  props: UseMutationOptions<TData, TError, TVariables, TContext>
) => {
  const mutation = useMutation(props)

  const mutateWithResult = async (payload: TVariables) => {
    try {
      await mutation.mutateAsync(payload)
      return true
    } catch (e: unknown) {
      console.error(await handleError(e)) // Todo: 센트리 이관
      return false
    }
  }

  return { ...mutation, mutateWithResult }
}
