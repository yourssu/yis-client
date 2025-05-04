import { createRootRoute, Outlet } from '@tanstack/react-router'

const Root = () => {
  return <Outlet />
}

export const Route = createRootRoute({
  component: Root,
})
