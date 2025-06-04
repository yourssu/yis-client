import { GNB } from '@/components/GNB'
import { createFileRoute, Outlet } from '@tanstack/react-router'

const AdminLayout = () => {
  return (
    <div>
      <GNB />
      <div className="grid grid-cols-[184px_1fr] gap-10 p-4">
        <div />
        <div className="mx-auto mt-10 w-full max-w-[1200px]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_auth/admin')({
  component: AdminLayout,
})
