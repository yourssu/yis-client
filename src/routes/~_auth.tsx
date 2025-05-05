import { removeAuthTokens } from '@/utils/auth'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

const AuthLayout = () => {
  return <Outlet />
}

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated()) {
      removeAuthTokens()
      throw redirect({ to: '/signin' })
    }
  },
})
