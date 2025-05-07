import { getMe } from '@/apis/user'
import { useSuspenseQuery } from '@tanstack/react-query'

export const useSuspensedMe = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['me'],
    queryFn: getMe,
  })

  return data
}
