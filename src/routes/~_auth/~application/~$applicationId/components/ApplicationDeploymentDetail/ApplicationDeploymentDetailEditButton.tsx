import { Button } from '@/components/Button'
import { useAlertDialog } from '@/hooks/useAlertDialog'
import { ApplicationDeploymentDetailEditForm } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDeploymentDetail/ApplicationDeploymentDetailEditForm'
import { FullApplicationType } from '@/types/application'
import { DeploymentType } from '@/types/deployment'

interface ApplicationDeploymentDetailEditButtonProps {
  application: FullApplicationType
  deployment: DeploymentType
}

export const ApplicationDeploymentDetailEditButton = ({
  application,
  deployment,
}: ApplicationDeploymentDetailEditButtonProps) => {
  const openEditDialog = useAlertDialog()

  const isReturned = deployment.state === 'RETURN'

  const onClick = () => {
    openEditDialog({
      title: `배포 ${isReturned ? '재요청' : '수정'}`,
      closeButton: true,
      closeableWithOutside: false,
      content: ({ closeAsTrue }) => (
        <ApplicationDeploymentDetailEditForm
          application={application}
          closeDialog={closeAsTrue}
          defaultValue={{
            domainName: deployment.domainName,
            imageUrl: deployment.imageUrl,
            port: deployment.port,
            cpuRequests: deployment.cpuRequests,
            cpuLimits: deployment.cpuLimits,
            memoryRequests: deployment.memoryRequests,
            memoryLimits: deployment.memoryLimits,
          }}
          deploymentId={deployment.id}
          isRequestResend={isReturned}
        />
      ),
    })
  }

  return (
    <Button onClick={onClick} size="md" variant={isReturned ? 'primary' : 'secondary'}>
      {isReturned ? '재요청하기' : '수정하기'}
    </Button>
  )
}
