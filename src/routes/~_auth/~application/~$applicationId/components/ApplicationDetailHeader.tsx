import { Dispatch, SetStateAction, Suspense } from 'react'

import { ProfileAvatar } from '@/components/ProfileAvatar'
import { ApplicationClusterStatus } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationClusterStatus'
import { ApplicationDetailHeaderButtonGroup } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDetailHeaderButtonGroup'
import { ApplicationDetailPageSearchParams } from '@/routes/~_auth/~application/~$applicationId/type'
import { FullApplicationType } from '@/types/application'

interface ApplicationDetailHeaderProps {
  application: FullApplicationType
  setTab: Dispatch<SetStateAction<ApplicationDetailPageSearchParams['tab']>>
}

export const ApplicationDetailHeader = ({ application, setTab }: ApplicationDetailHeaderProps) => {
  const { user, clusterStatus } = application

  return (
    <div>
      <div className="mb-2 flex items-center gap-2.5">
        <ProfileAvatar avatarId={user.avatarId} rounded size={28} />
        <div className="text-neutralMuted text-15 font-semibold">{user.nickname}</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-semibold">{application.name}</div>
            <div className="text-neutralMuted text-15">{application.description}</div>
          </div>
          <div className="flex items-center gap-1.5">
            <ApplicationClusterStatus clusterStatus={clusterStatus} />
          </div>
        </div>
        <Suspense>
          <ApplicationDetailHeaderButtonGroup application={application} setTab={setTab} />
        </Suspense>
      </div>
    </div>
  )
}
