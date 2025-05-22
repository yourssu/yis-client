import { compareDesc } from 'date-fns'

import { userKey } from '@/apis/keys'
import { getUserApplicationsWithRecentDeployment } from '@/apis/user'
import { ItemList } from '@/components/ItemList'
import { useSuspensedMe } from '@/hooks/useMe'
import { ApplicationCard } from '@/routes/~_auth/~profile/components/ApplicationCard'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { useSuspenseQuery } from '@tanstack/react-query'

export const MyApplicationsSection = () => {
  const { id: userId } = useSuspensedMe()
  const { data: applications } = useSuspenseQuery({
    queryKey: userKey.applications(userId),
    queryFn: () => getUserApplicationsWithRecentDeployment({ userId }),
  })

  const allApplications = applications.toSorted((a, b) => compareDesc(a.createdAt, b.createdAt))

  return (
    <div className="flex w-full flex-col gap-10">
      <ItemList>
        <ItemList.Header>내 어플리케이션</ItemList.Header>
        {allApplications.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center gap-8 py-12">
            <DotLottieReact
              autoplay
              className="size-12"
              speed={1.2}
              src="/lotties/empty-list.lottie"
            />
            <div className="text-neutralSubtle text-sm font-medium">
              배포된 어플리케이션이 없어요
            </div>
          </div>
        ) : (
          <ItemList.Body>
            <div className="grid grid-cols-2 gap-2">
              {allApplications.map((application) => (
                <ApplicationCard application={application} key={application.id} />
              ))}
            </div>
          </ItemList.Body>
        )}
      </ItemList>
    </div>
  )
}
