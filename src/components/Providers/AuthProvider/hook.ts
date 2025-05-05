import { useContext } from 'react'

import { AuthContext } from '@/components/Providers/AuthProvider/context'

export const useAuth = () => {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('useAuth는 AuthProvider 하위에서만 사용할 수 있어요.')
  }

  return authContext
}
