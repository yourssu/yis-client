import { useApplicationDeploymentsInvalidation } from '@/apis/application'
import { rollbackDeployment } from '@/apis/deployment'
import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { useAlertDialog } from '@/hooks/useAlertDialog'
import { useToastedMutation } from '@/hooks/useToastedMutation'

interface ApplicationDeploymentDetailRollbackButtonProps {
  applicationId: number
  isRecentApproved: boolean
  rollbackDeploymentId: number
}

export const ApplicationDeploymentDetailRollbackButton = ({
  isRecentApproved,
  applicationId,
  rollbackDeploymentId,
}: ApplicationDeploymentDetailRollbackButtonProps) => {
  const openRollbackAlertDialog = useAlertDialog()
  const { mutateWithToast } = useToastedMutation({
    mutationFn: () => rollbackDeployment(rollbackDeploymentId),
    successText: '배포 롤백에 성공했어요.',
    errorText: '배포 롤백에 실패했어요. 잠시 후 다시 시도해주세요.',
  })
  const invalidateApplicationDeployments = useApplicationDeploymentsInvalidation(applicationId)

  const onClick = async () => {
    await openRollbackAlertDialog({
      closeButton: true,
      closeableWithOutside: true,
      title: '롤백을 진행할까요?',
      content: ({ closeAsFalse, closeAsTrue }) => (
        <>
          <Dialog.Content className="w-[400px]">
            롤백을 진행하면 이 배포로 되돌아가요.
          </Dialog.Content>
          <Dialog.ButtonGroup>
            <Dialog.Button onClick={closeAsFalse} variant="secondary">
              취소
            </Dialog.Button>
            <Dialog.Button
              onClick={async () => {
                await mutateWithToast()
                invalidateApplicationDeployments()
                closeAsTrue()
              }}
              variant="primary"
            >
              롤백하기
            </Dialog.Button>
          </Dialog.ButtonGroup>
        </>
      ),
    })
  }

  return (
    <Button disabled={isRecentApproved} onClick={onClick} size="md" variant="primary">
      이 배포로 롤백하기
    </Button>
  )
}
