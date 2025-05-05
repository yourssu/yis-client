import { useToast } from '@/hooks/useToast'
import { DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query'

export const useToastedMutation = <
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(
  props: UseMutationOptions<TData, TError, TVariables, TContext> & {
    errorText: string
    successText: string
  }
) => {
  const { successText, errorText, ...mutationProps } = props

  const toast = useToast()
  const mutation = useMutation(mutationProps)

  const mutateWithToast = async (payload: TVariables) => {
    try {
      const res = await mutation.mutateAsync(payload)
      toast.success(successText)
      return res
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
    } catch (e) {
      toast.error(errorText)
    }
  }

  return { ...mutation, mutateWithToast }
}
