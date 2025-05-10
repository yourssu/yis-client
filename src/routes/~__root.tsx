import { AuthContextProps } from '@/components/Providers/AuthProvider/context'
import { createRootRouteWithContext, Navigate, Outlet } from '@tanstack/react-router'

const Root = () => {
  return <Outlet />
}

interface RouteContext {
  auth: AuthContextProps
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: Root,
  notFoundComponent: () => <Navigate replace to="/404" />,
})
