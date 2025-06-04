import { useToast } from '@/hooks/useToast'
import { handleError } from '@/utils/error'
import { DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query'

export const useToastedMutation = <
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(
  props: UseMutationOptions<TData, TError, TVariables, TContext> & {
    errorText?: string
    successText: string
  }
) => {
  const { successText, errorText, ...mutationProps } = props

  const toast = useToast()
  const mutation = useMutation(mutationProps)

  const mutateWithToast = async (payload: TVariables) => {
    try {
      const res = await mutation.mutateAsync(payload)
      if (successText) {
        toast.success(successText)
      }
      return res
    } catch (e: unknown) {
      const error = await handleError(e)
      console.error(error) // Todo: 센트리 이관
      toast.error(errorText ?? error.message)
    }
  }

  return { ...mutation, mutateWithToast }
}
