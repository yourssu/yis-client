import clsx from 'clsx'

import { GNB } from '@/components/GNB'
import { RoutePath } from '@/types/route'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

const Sidebar = () => {
  const links: Array<{ name: string; to: RoutePath }> = [
    {
      name: '배포 요청',
      to: '/admin/requests',
    },
    {
      name: '유저 목록',
      to: '/admin/users',
    },
    {
      name: '서비스 목록',
      to: '/admin/applications',
    },
  ]

  return (
    <div className="flex flex-col gap-1">
      {links.map(({ name, to }) => (
        <Link key={name} to={to}>
          {({ isActive }) => (
            <button
              className={clsx(
                'text-15 hover:bg-grey100 focus-visible:bg-grey100 active:bg-grey100 ease-ease w-full cursor-pointer rounded-md px-3.5 py-2 text-left transition-colors duration-200',
                isActive && 'bg-grey100'
              )}
            >
              {name}
            </button>
          )}
        </Link>
      ))}
    </div>
  )
}

const AdminLayout = () => {
  return (
    <div>
      <GNB />
      <div className="grid grid-cols-[184px_1fr] gap-10 p-4">
        <Sidebar />
        <div className="mx-auto w-full max-w-[1200px]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_auth/admin')({
  component: AdminLayout,
})
