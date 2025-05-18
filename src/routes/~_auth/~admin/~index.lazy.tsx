import { Suspense } from 'react'

import { GNB } from '@/components/GNB'
import { PageValidator } from '@/components/PageValidator'
import { DeploymentStateTable } from '@/routes/~_auth/~admin/components/DeploymentStateTable'
import { createLazyFileRoute } from '@tanstack/react-router'

const Admin = () => {
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
      <PageValidator validate={(me) => me.role === 'ADMIN'}>
        <Admin />
      </PageValidator>
    </Suspense>
  ),
})
