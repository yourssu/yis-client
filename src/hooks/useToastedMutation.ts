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
      const { message } = await handleError(e)
      toast.error(errorText ?? message)
    }
  }

  return { ...mutation, mutateWithToast }
}
