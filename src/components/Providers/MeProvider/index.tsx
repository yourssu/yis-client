import { useEffect } from 'react'

import { userKey } from '@/apis/keys'
import { getMe } from '@/apis/user'
import { useQueryClient } from '@tanstack/react-query'

export const MeProvider = ({ children }: React.PropsWithChildren) => {
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: userKey.me(),
      queryFn: getMe,
    })
  }, [])

  return children
}
