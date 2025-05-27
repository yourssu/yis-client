import { Divider } from '@/components/Divider'
import { DeploymentStateListDetailFooter } from '@/routes/~_auth/~admin/components/DeploymentStateListDetailFooter'
import { DeploymentStateListDetailHeader } from '@/routes/~_auth/~admin/components/DeploymentStateListDetailHeader'
import { DeploymentStateListDetailInformation } from '@/routes/~_auth/~admin/components/DeploymentStateListDetailInformation'
import { ApplicationType } from '@/types/application'
import { DeploymentStateNames, DeploymentType } from '@/types/deployment'

interface DeploymentStateListDetailProps {
  application: ApplicationType
  deployment: DeploymentType
  state: DeploymentStateNames
}

export const DeploymentStateListDetail = ({
  deployment,
  application,
  state,
}: DeploymentStateListDetailProps) => {
  return (
    <div className="flex flex-col gap-5">
      <DeploymentStateListDetailHeader application={application} />
      <DeploymentStateListDetailInformation deployment={deployment} state={state} />
      <Divider />
      <div className="text-sm">
        <div className="text-neutralMuted mb-2">{application.user.nickname}님이 남긴 메시지</div>
        <div>{deployment.message ? deployment.message : '-'}</div>
      </div>
      <Divider />
      {deployment.adminId && (
        <div className="text-sm">
          {/* Todo: 어드민 닉네임으로 수정 */}
          <div className="text-neutralMuted mb-2">
            어드민 ID '{deployment.adminId}' 님이 보낸 메시지
          </div>
          <div>{deployment.comment ? deployment.comment : '-'}</div>
        </div>
      )}
      {state === 'REQUEST' && (
        <DeploymentStateListDetailFooter deploymentId={deployment.id} state={state} />
      )}
    </div>
  )
}
