import { AuthContextProps } from '@/components/Providers/AuthProvider/context'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

const Root = () => {
  return <Outlet />
}

interface RouteContext {
  auth: AuthContextProps
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: Root,
})
