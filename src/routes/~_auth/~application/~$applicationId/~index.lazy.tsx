import { Suspense } from 'react'
import { IoMdTrash } from 'react-icons/io'
import { MdMoreHoriz } from 'react-icons/md'

import { getApplication } from '@/apis/application'
import { applicationKey } from '@/apis/keys'
import { GNB } from '@/components/GNB'
import { IconButton } from '@/components/IconButton'
import { Menu } from '@/components/Menu'
import { PageValidator } from '@/components/PageValidator'
import { ProfileAvatar } from '@/components/ProfileAvatar'
import { ApplicationClusterStatus } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationClusterStatus'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'

const Application = () => {
  const applicationId = Number(Route.useParams().applicationId)
  const { data: application } = useSuspenseQuery({
    queryKey: applicationKey.detail(applicationId),
    queryFn: () => getApplication(applicationId),
  })

  return (
    <PageValidator validate={({ email }) => email !== application.user.email}>
      <div className="mx-auto w-full max-w-[1200px] pt-8">
        <div className="mb-4 flex items-center gap-2.5">
          <ProfileAvatar avatarId={application.user.avatarId} rounded size={28} />
          <div className="text-neutralMuted text-15 font-semibold">{application.user.nickname}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-semibold">{application.name}</div>
              <div className="text-neutralMuted text-15">{application.description}</div>
            </div>
            <div className="flex items-center gap-1.5">
              <Suspense>
                <ApplicationClusterStatus applicationId={applicationId} />
              </Suspense>
            </div>
          </div>
          <Menu>
            <Menu.Target>
              <IconButton className="text-neutralMuted" size="md">
                <MdMoreHoriz className="size-5" />
              </IconButton>
            </Menu.Target>
            <Menu.Content
              align="end"
              className="bg-grey100 min-w-[180px] rounded-lg p-1.5 text-sm"
              sideOffset={6}
            >
              <Menu.ButtonItem className="flex items-center gap-1 rounded-md px-3 py-2">
                <IoMdTrash className="text-red500 size-4.5" />
                서비스 삭제하기
              </Menu.ButtonItem>
            </Menu.Content>
          </Menu>
        </div>
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
