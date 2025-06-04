import clsx from 'clsx'
import { Suspense } from 'react'
import { useIntersectionObserver } from 'react-simplikit'

import { userKey } from '@/apis/keys'
import { getAllUsers } from '@/apis/user'
import { UserRoleBadge } from '@/components/Badges/UserRoleBadge'
import { ProfileAvatar } from '@/components/ProfileAvatar'
import { Table } from '@/components/Table'
import { UserMenu } from '@/routes/~_auth/~admin/~users/components/UserMenu'
import { formatTemplates } from '@/utils/date'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'

const AdminUsers = () => {
  const { data, fetchNextPage } = useSuspenseInfiniteQuery({
    queryKey: userKey.all,
    queryFn: () => getAllUsers({ orderBy: 'CREATED_AT_DESC' }),
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

  const users = data.pages.flatMap(({ data }) => data)

  return (
    <>
      <Table>
        <Table.Head
          headers={[
            `유저 · ${data.pages[0].totalCount}명`,
            '이메일',
            '소속 파트',
            '가입일',
            '활성 여부',
            '',
          ]}
        />
        <Table.Body>
          {users.map((user, index) => (
            <Table.Row index={index} key={user.id}>
              <Table.Cell>
                <div className="flex items-center gap-3">
                  <div className="text-brandPrimary flex min-w-[32px] items-center justify-center font-semibold">
                    {user.id}
                  </div>
                  <ProfileAvatar avatarId={user.avatarId} rounded size={24} />
                  <div className="font-medium">{user.nickname}</div>
                  <UserRoleBadge role={user.role} size="sm" />
                </div>
              </Table.Cell>
              <Table.Cell className="text-neutralMuted">{user.email}</Table.Cell>
              <Table.Cell className="text-neutralMuted">{user.part}</Table.Cell>
              <Table.Cell className="text-neutralMuted">
                {formatTemplates['24/01/01 23:00'](user.createdAt)}
              </Table.Cell>
              <Table.Cell
                className={clsx('font-medium', user.isActive ? 'text-green500' : 'text-grey500')}
              >
                {user.isActive ? '활성' : '비활성'}
              </Table.Cell>
              <Table.Cell innerClassName="min-w-auto">
                <UserMenu user={user} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="h-10 w-full" ref={refetcherRef} />
    </>
  )
}

export const Route = createLazyFileRoute('/_auth/admin/users/')({
  component: () => (
    <Suspense>
      <AdminUsers />
    </Suspense>
  ),
})
