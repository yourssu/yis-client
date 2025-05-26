import { useInputState } from 'react-simplikit'

import { updateDeploymentState, useDeploymentsByStateInvalidation } from '@/apis/deployment'
import { Button } from '@/components/Button'
import { Divider } from '@/components/Divider'
import { ProfileAvatar } from '@/components/ProfileAvatar'
import { TextInput } from '@/components/TextInput/TextInput'
import { useToastedMutation } from '@/hooks/useToastedMutation'
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
  const [comment, setComment] = useInputState('')

  const { mutateWithToast } = useToastedMutation({
    mutationFn: updateDeploymentState,
    successText: '검토 결과를 보냈어요',
    errorText: '검토 결과 전송에 실패했어요',
  })
  const invalidateDeployments = useDeploymentsByStateInvalidation({ state })

  const listPairs = [
    {
      label: '도메인',
      value: deployment.domainName,
    },
    {
      label: '포트 번호',
      value: deployment.port,
    },
    {
      label: '도커 이미지 주소',
      value: deployment.imageUrl,
    },
    {
      label: 'CPU Request',
      value: deployment.cpuRequests,
    },
    {
      label: 'CPU Limit',
      value: deployment.cpuLimits,
    },
    {
      label: 'Memory Request',
      value: deployment.memoryRequests,
    },
    {
      label: 'Memory Limit',
      value: deployment.memoryLimits,
    },
  ]

  const onClickApprove = async () => {
    await mutateWithToast({
      id: deployment.id,
      state: 'APPROVAL',
      link: 'https://wow.com', // Todo: 링크 변경해야 함.
      comment: comment ? comment : undefined,
    })
    invalidateDeployments()
  }

  const onClickReject = async () => {
    await mutateWithToast({
      id: deployment.id,
      state: 'RETURN',
      link: 'https://wow.com', // Todo: 링크 변경해야 함.
      comment: comment ? comment : undefined,
    })
    invalidateDeployments()
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="mb-1 text-lg font-semibold">{application.name}</div>
          <div className="text-neutralSubtle text-sm">{application.description}</div>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <ProfileAvatar avatarId={application.user.avatarId} rounded size={40} />
          <div className="text-neutralMuted text-15 font-semibold">{application.user.nickname}</div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {listPairs.map(({ label, value }) => (
          <div className="flex items-center justify-between text-sm" key={label}>
            <div className="text-neutralMuted">{label}</div>
            <div>{value}</div>
          </div>
        ))}
      </div>
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
        <div className="flex flex-col gap-3">
          {/* Todo: TextField로 변경해야 함 */}
          <TextInput
            onChange={setComment}
            placeholder="작성할 코멘트가 있다면 작성해주세요..."
            value={comment}
          />
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={onClickReject} size="lg" variant="secondary">
              거부
            </Button>
            <Button onClick={onClickApprove} size="lg" variant="primary">
              승인
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
