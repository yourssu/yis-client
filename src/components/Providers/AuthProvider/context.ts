import { createContext } from 'react'

export interface AuthContextProps {
  isAuthenticated: () => boolean
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)
