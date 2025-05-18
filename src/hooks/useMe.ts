import { userKey } from '@/apis/keys'
import { getMe } from '@/apis/user'
import { useSuspenseQuery } from '@tanstack/react-query'

export const useSuspensedMe = () => {
  const { data } = useSuspenseQuery({
    queryKey: userKey.me(),
    queryFn: getMe,
  })

  return data
}
