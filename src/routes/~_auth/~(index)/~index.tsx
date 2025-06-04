import { Suspense } from 'react'

import { userKey } from '@/apis/keys'
import { getUserFullApplications } from '@/apis/user'
import { GNB } from '@/components/GNB'
import { useSuspensedMe } from '@/hooks/useMe'
import { ApplicationListLanding } from '@/routes/~_auth/~(index)/components/ApplicationListLanding'
import { NoApplicationLanding } from '@/routes/~_auth/~(index)/components/NoApplicationLanding'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

const Index = () => {
  const { id: userId } = useSuspensedMe()
  const { data: applications } = useSuspenseQuery({
    queryKey: userKey.applications(userId),
    queryFn: () => getUserFullApplications({ userId }),
  })

  if (applications.length > 0) {
    return <ApplicationListLanding applications={applications} meId={userId} />
  }
  return <NoApplicationLanding meId={userId} />
}

export const Route = createFileRoute('/_auth/(index)/')({
  component: () => (
    <div>
      <GNB />
      <Suspense>
        <Index />
      </Suspense>
    </div>
  ),
})
