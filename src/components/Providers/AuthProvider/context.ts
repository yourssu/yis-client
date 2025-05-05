import { createContext } from 'react'

export interface AuthContextProps {
  isAuthenticated: () => void
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: () => {},
})
