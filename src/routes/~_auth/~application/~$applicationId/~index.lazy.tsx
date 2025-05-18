import { Suspense } from 'react'

import { getApplication } from '@/apis/application'
import { applicationKey } from '@/apis/keys'
import { GNB } from '@/components/GNB'
import { useSuspensedMe } from '@/hooks/useMe'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createLazyFileRoute, Navigate } from '@tanstack/react-router'

const Application = () => {
  const applicationId = Number(Route.useParams().applicationId)

  const { email: myEmail } = useSuspensedMe()
  const { data: application } = useSuspenseQuery({
    queryKey: applicationKey.detail(applicationId),
    queryFn: () => getApplication(applicationId),
  })

  if (myEmail !== application.user.email) {
    return <Navigate replace to="/404" />
  }

  return <div>{applicationId}</div>
}

export const Route = createLazyFileRoute('/_auth/application/$applicationId/')({
  component: () => (
    <div>
      <GNB />
      <Suspense>
        <Application />
      </Suspense>
    </div>
  ),
})
