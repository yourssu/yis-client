import { GNB } from '@/components/GNB'
import { GrainyBackground } from '@/routes/~_sign/components/GrainyBackground'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

const SignLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <GrainyBackground />
      <GNB transparent />
      <div className="flex grow flex-col items-center justify-center gap-8">
        <Outlet />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_sign')({
  component: SignLayout,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated()) {
      throw redirect({ to: '/' })
    }
  },
})
