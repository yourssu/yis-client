import { Button } from '@/components/Button'

interface ApplicationDeploymentDetailRollbackButtonProps {
  isRecentApproved: boolean
}

export const ApplicationDeploymentDetailRollbackButton = ({
  isRecentApproved,
}: ApplicationDeploymentDetailRollbackButtonProps) => {
  return (
    <Button disabled={isRecentApproved} size="md" variant="primary">
      이 배포로 롤백하기
    </Button>
  )
}
