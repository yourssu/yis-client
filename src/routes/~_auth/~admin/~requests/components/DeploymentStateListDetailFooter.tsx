import { trimEnd } from 'es-toolkit'
import { useInputState } from 'react-simplikit'

import { updateDeploymentState, useDeploymentsByStateInvalidation } from '@/apis/deployment'
import { Button } from '@/components/Button'
import { TextInput } from '@/components/TextInput/TextInput'
import { useToastedMutation } from '@/hooks/useToastedMutation'
import { DeploymentStateNames } from '@/types/deployment'

type ReviewType = Extract<DeploymentStateNames, 'APPROVAL' | 'RETURN'>

interface DeploymentStateListDetailFooterProps {
  deploymentId: number
  state: DeploymentStateNames
}

const getReviewOpenLinkUrl = (type: ReviewType) => {
  return `${trimEnd(import.meta.env.VITE_APP_PROD_URL, '/')}/admin?tab=${type}&id={id}` // 백엔드에서 {id}에 실제 배포 아이디를 넣어줘요.
}

export const DeploymentStateListDetailFooter = ({
  deploymentId,
  state,
}: DeploymentStateListDetailFooterProps) => {
  const [comment, setComment] = useInputState('')

  const { mutateWithToast, isPending } = useToastedMutation({
    mutationFn: updateDeploymentState,
    successText: '검토 결과를 보냈어요',
    errorText: '검토 결과 전송에 실패했어요',
  })
  const invalidateDeployments = useDeploymentsByStateInvalidation({ state })

  const getReviewResultProps = (type: ReviewType) => {
    return {
      id: deploymentId,
      state: type,
      link: getReviewOpenLinkUrl(type),
      comment: comment ? comment : undefined,
    }
  }

  const onClickApprove = async () => {
    await mutateWithToast(getReviewResultProps('APPROVAL'))
    invalidateDeployments()
  }

  const onClickReject = async () => {
    await mutateWithToast(getReviewResultProps('RETURN'))
    invalidateDeployments()
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Todo: TextField로 변경해야 함 */}
      <TextInput
        onChange={setComment}
        placeholder="작성할 코멘트가 있다면 작성해주세요..."
        value={comment}
      />
      <div className="grid grid-cols-2 gap-2">
        <Button disabled={isPending} onClick={onClickReject} size="lg" variant="secondary">
          거부
        </Button>
        <Button disabled={isPending} onClick={onClickApprove} size="lg" variant="primary">
          승인
        </Button>
      </div>
    </div>
  )
}
