import { ApplicationDeploymentDetailHeader } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDeploymentDetail/ApplicationDeploymentDetailHeader'
import { ApplicationDeploymentDetailInformation } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDeploymentDetail/ApplicationDeploymentDetailInformation'
import { DeploymentType } from '@/types/deployment'

interface ApplicationDeploymentDetailProps {
  deployment: DeploymentType
}

export const ApplicationDeploymentDetail = ({ deployment }: ApplicationDeploymentDetailProps) => {
  return (
    <div className="flex flex-col gap-5">
      <ApplicationDeploymentDetailHeader deployment={deployment} />
      <ApplicationDeploymentDetailInformation deployment={deployment} />
    </div>
  )
}
