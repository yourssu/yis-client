import { Suspense } from 'react'

import { GNB } from '@/components/GNB'
import { PageValidator } from '@/components/PageValidator'
import { DeploymentStateTable } from '@/routes/~_auth/~admin/~requests/components/DeploymentStateTable'
import { createLazyFileRoute } from '@tanstack/react-router'

const Admin = () => {
  return (
    <div>
      <GNB />
      <div className="grid grid-cols-[184px_1fr] gap-10 p-4">
        <div />
        <div className="mx-auto mt-10 flex w-full max-w-[1200px] flex-col items-center gap-20">
          <DeploymentStateTable />
        </div>
      </div>
    </div>
  )
}

export const Route = createLazyFileRoute('/_auth/admin/requests/')({
  component: () => (
    <Suspense>
      <PageValidator validate={(me) => me.role === 'ADMIN'}>
        <Admin />
      </PageValidator>
    </Suspense>
  ),
})
