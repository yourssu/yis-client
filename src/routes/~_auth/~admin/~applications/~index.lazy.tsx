import { Suspense } from 'react'
import { useIntersectionObserver } from 'react-simplikit'

import { getAllApplications } from '@/apis/application'
import { applicationKey } from '@/apis/keys'
import { ProfileAvatar } from '@/components/ProfileAvatar'
import { Table } from '@/components/Table'
import { formatTemplates } from '@/utils/date'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'

const AdminApplications = () => {
  const navigate = Route.useNavigate()
  const { data, fetchNextPage } = useSuspenseInfiniteQuery({
    queryKey: applicationKey.all,
    queryFn: () => getAllApplications({ orderBy: 'CREATED_AT_DESC' }),
    getNextPageParam: (lastPage) => {
      const next = lastPage.currentLimit + lastPage.currentSkip
      return next < lastPage.totalCount ? next : undefined
    },
    initialPageParam: 0,
  })

  const refetcherRef = useIntersectionObserver<HTMLDivElement>(
    (entry) => {
      if (entry.isIntersecting) {
        fetchNextPage()
      }
    },
    { threshold: 0.5 }
  )

  const applications = data.pages.flatMap(({ data }) => data)

  return (
    <>
      <Table>
        <Table.Head
          headers={[`서비스 · ${data.pages[0].totalCount}개`, '사용자', '생성일', '수정일']}
        />
        <Table.Body>
          {applications.map((application, index) => (
            <Table.Row
              className="hover:bg-grey100 cursor-pointer"
              index={index}
              key={application.id}
              onClick={() =>
                navigate({
                  to: '/application/$applicationId',
                  params: { applicationId: application.id.toString() },
                  search: { tab: 'overview' },
                })
              }
            >
              <Table.Cell>
                <div className="flex items-center gap-1">
                  <div className="text-brandPrimary flex min-w-[32px] items-center justify-center font-semibold">
                    {application.id}
                  </div>
                  <div>{application.name}</div>
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-2">
                  <ProfileAvatar avatarId={application.user.avatarId} rounded size={20} />
                  <div className="font-medium">{application.user.nickname}</div>
                </div>
              </Table.Cell>
              <Table.Cell>{formatTemplates['24.01.01 23:00'](application.createdAt)}</Table.Cell>
              <Table.Cell>{formatTemplates['24.01.01 23:00'](application.updatedAt)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="h-10 w-full" ref={refetcherRef} />
    </>
  )
}

export const Route = createLazyFileRoute('/_auth/admin/applications/')({
  component: () => (
    <Suspense>
      <AdminApplications />
    </Suspense>
  ),
})
