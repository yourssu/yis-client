import { Suspense } from 'react'

import { PageValidator } from '@/components/PageValidator'
import { DeploymentStateTable } from '@/routes/~_auth/~admin/~requests/components/DeploymentStateTable'
import { createLazyFileRoute } from '@tanstack/react-router'

const Admin = () => {
  return <DeploymentStateTable />
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
