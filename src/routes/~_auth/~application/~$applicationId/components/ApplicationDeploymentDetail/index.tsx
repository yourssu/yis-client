import { Suspense } from 'react'

import { Divider } from '@/components/Divider'
import { ApplicationDeploymentDetailConversation } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDeploymentDetail/ApplicationDeploymentDetailConversation'
import { ApplicationDeploymentDetailEditButton } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDeploymentDetail/ApplicationDeploymentDetailEditButton'
import { ApplicationDeploymentDetailHeader } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDeploymentDetail/ApplicationDeploymentDetailHeader'
import { ApplicationDeploymentDetailInformation } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDeploymentDetail/ApplicationDeploymentDetailInformation'
import { ApplicationDeploymentDetailRollbackButton } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDeploymentDetail/ApplicationDeploymentDetailRollbackButton'
import { FullApplicationType } from '@/types/application'
import { DeploymentType } from '@/types/deployment'

interface ApplicationDeploymentDetailProps {
  application: FullApplicationType
  deployment: DeploymentType
  isRecentApproved: boolean
}

export const ApplicationDeploymentDetail = ({
  application,
  deployment,
  isRecentApproved,
}: ApplicationDeploymentDetailProps) => {
  return (
    <div className="flex flex-col gap-5">
      <ApplicationDeploymentDetailHeader deployment={deployment} />
      <ApplicationDeploymentDetailInformation deployment={deployment} />
      <Divider />
      <Suspense>
        <ApplicationDeploymentDetailConversation
          applicationUser={{
            avatarId: application.user.avatarId,
            nickname: application.user.nickname,
          }}
          deployment={deployment}
        />
      </Suspense>
      <Divider />
      {deployment.state === 'APPROVAL' ? (
        <ApplicationDeploymentDetailRollbackButton
          applicationId={application.id}
          isRecentApproved={isRecentApproved}
          rollbackDeploymentId={deployment.id}
        />
      ) : (
        <ApplicationDeploymentDetailEditButton deployment={deployment} />
      )}
    </div>
  )
}
