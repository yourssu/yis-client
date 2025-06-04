import { Suspense } from 'react'

import { getFullApplication } from '@/apis/application'
import { applicationKey } from '@/apis/keys'
import { GNB } from '@/components/GNB'
import { PageValidator } from '@/components/PageValidator'
import { useSearchState } from '@/hooks/useSearchState'
import { useSetStateSelector } from '@/hooks/useSetStateSelector'
import { ApplicationDetailHeader } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDetailHeader'
import { ApplicationDetailTab } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDetailTab'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'

const Application = () => {
  const applicationId = Number(Route.useParams().applicationId)
  const { data: application } = useSuspenseQuery({
    queryKey: applicationKey.detail(applicationId),
    queryFn: () => getFullApplication(applicationId),
  })

  const [search, setSearch] = useSearchState({
    from: '/_auth/application/$applicationId/',
  })
  const setTab = useSetStateSelector(setSearch, 'tab')

  return (
    <PageValidator
      validate={({ email, role }) => email === application.user.email || role === 'ADMIN'}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <ApplicationDetailHeader application={application} setTab={setTab} />
        <div className="h-4" />
        <ApplicationDetailTab application={application} setTab={setTab} tab={search.tab} />
      </div>
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
