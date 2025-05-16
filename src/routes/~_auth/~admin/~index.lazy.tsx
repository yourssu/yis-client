import { Suspense } from 'react'

import { GNB } from '@/components/GNB'
import { useSuspensedMe } from '@/hooks/useMe'
import { DeploymentStateTable } from '@/routes/~_auth/~admin/components/DeploymentStateTable'
import { createLazyFileRoute, Navigate } from '@tanstack/react-router'

const Admin = () => {
  const { role } = useSuspensedMe()

  if (role !== 'ADMIN') {
    return <Navigate replace to="/404" />
  }

  return (
    <div>
      <GNB />
      <div className="mx-auto mt-10 flex max-w-[1200px] flex-col items-center gap-20">
        <DeploymentStateTable />
      </div>
    </div>
  )
}

export const Route = createLazyFileRoute('/_auth/admin/')({
  component: () => (
    <Suspense>
      <Admin />
    </Suspense>
  ),
})
