import { MdKeyboardArrowDown } from 'react-icons/md'

import { getUserApplications } from '@/apis/user'
import { Button } from '@/components/Button'
import { Divider } from '@/components/Divider'
import { ItemList } from '@/components/ItemList'
import { useSuspensedMe } from '@/hooks/useMe'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

export const MyApplicationsSection = () => {
  const { id: userId } = useSuspensedMe()
  const { data: applications, fetchNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['user-applications', userId],
    queryFn: ({ pageParam }) => getUserApplications({ userId, skip: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (_, pages) => pages.flat().length,
  })

  const allApplications = applications.pages.flat()

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
            {allApplications.map((application) => (
              <div key={application.id}>{application.name}</div>
            ))}
            <Divider className="mt-4 mb-2" />
            <Button onClick={() => fetchNextPage()} size="md" variant="transparent">
              <div className="flex items-center justify-center">
                더보기
                <MdKeyboardArrowDown className="size-5" />
              </div>
            </Button>
          </ItemList.Body>
        )}
      </ItemList>
    </div>
  )
}
