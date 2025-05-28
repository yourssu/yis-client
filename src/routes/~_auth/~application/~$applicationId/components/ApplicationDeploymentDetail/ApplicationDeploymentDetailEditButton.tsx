import { Button } from '@/components/Button'
import { useAlertDialog } from '@/hooks/useAlertDialog'
import { ApplicationDeploymentDetailEditForm } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDeploymentDetail/ApplicationDeploymentDetailEditForm'
import { DeploymentType } from '@/types/deployment'

interface ApplicationDeploymentDetailEditButtonProps {
  deployment: DeploymentType
}

export const ApplicationDeploymentDetailEditButton = ({
  deployment,
}: ApplicationDeploymentDetailEditButtonProps) => {
  const openEditDialog = useAlertDialog()

  const onClick = () => {
    openEditDialog({
      title: '배포 수정',
      closeButton: true,
      closeableWithOutside: false,
      content: (
        <ApplicationDeploymentDetailEditForm
          applicationId={deployment.applicationId}
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
          manifests={deployment.manifests}
        />
      ),
    })
  }

  return (
    <Button onClick={onClick} size="md" variant="secondary">
      수정하기
    </Button>
  )
}
