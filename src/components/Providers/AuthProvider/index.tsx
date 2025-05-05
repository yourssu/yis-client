import { AuthContext } from '@/components/Providers/AuthProvider/context'
import { getAuthTokens } from '@/utils/auth'

export const AuthProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const isAuthenticated = () => {
    const authTokens = getAuthTokens()
    return !!authTokens
  }

  return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>
}
