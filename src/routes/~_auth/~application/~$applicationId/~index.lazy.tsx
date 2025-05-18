import { Suspense } from 'react'

import { getApplication } from '@/apis/application'
import { applicationKey } from '@/apis/keys'
import { GNB } from '@/components/GNB'
import { PageValidator } from '@/components/PageValidator'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'

const Application = () => {
  const applicationId = Number(Route.useParams().applicationId)
  const { data: application } = useSuspenseQuery({
    queryKey: applicationKey.detail(applicationId),
    queryFn: () => getApplication(applicationId),
  })

  return (
    <PageValidator validate={({ email }) => email === application.user.email}>
      <div>{applicationId}</div>
    </PageValidator>
  )
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
