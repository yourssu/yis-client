import { signout } from '@/apis/auth'
import { Button } from '@/components/Button'
import { AuthContextProps } from '@/components/Providers/AuthProvider/context'
import { RoutePath } from '@/types/route'
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
  errorComponent: ({ error, info, reset }) => {
    return (
      <div className="text-15 flex h-screen w-full items-center justify-center">
        <div className="bg-grey100 flex w-[960px] flex-col gap-4 rounded-2xl p-6">
          <div className="text-13 font-medium">렌더링 도중 에러가 발생했어요.</div>
          <div className="bg-grey200 rounded-lg px-4.5 py-3">
            <div className="text-neutralSubtle text-sm">{error.name}</div>
            <div className="text-15 font-medium">{error.message}</div>
          </div>
          <div className="flex flex-col gap-4 py-4">
            {[error.stack, info?.componentStack]
              .filter((v) => !!v)
              .map((v) => (
                <div className="w-full overflow-auto text-sm whitespace-pre-wrap" key={v}>
                  {v}
                </div>
              ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => {
                signout()
                window.location.href = '/signin' satisfies RoutePath
              }}
              size="lg"
              variant="subPrimary"
            >
              로그아웃
            </Button>
            <Button
              onClick={() => {
                reset()
              }}
              size="lg"
              variant="primary"
            >
              초기화
            </Button>
          </div>
        </div>
      </div>
    )
  },
})
