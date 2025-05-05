import { createContext } from 'react'

interface AuthContextProps {
  isAuthenticated: () => void
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: () => {},
})
