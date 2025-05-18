import { updateDeploymentState } from '@/apis/deployment'
import { Button } from '@/components/Button'
import { Divider } from '@/components/Divider'
import { ProfileAvatar } from '@/components/ProfileAvatar'
import { useToastedMutation } from '@/hooks/useToastedMutation'
import { ApplicationType } from '@/types/application'
import { DeploymentType } from '@/types/deployment'

interface DeploymentStateListDetailProps {
  application: ApplicationType
  deployment: DeploymentType
}

export const DeploymentStateListDetail = ({
  deployment,
  application,
}: DeploymentStateListDetailProps) => {
  const { mutateWithToast } = useToastedMutation({
    mutationFn: updateDeploymentState,
    successText: '보냈어요',
    errorText: '실패했어요',
  })

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
    })
  }

  const onClickReject = async () => {
    await mutateWithToast({
      id: deployment.id,
      state: 'RETURN',
      link: 'https://wow.com', // Todo: 링크 변경해야 함.
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="mb-1 text-lg font-semibold">{application.name}</div>
          <div className="text-neutralSubtle text-sm">{application.description}</div>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="size-10 overflow-hidden rounded-full">
            <ProfileAvatar avatarId={application.user.avatarId} />
          </div>
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
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={onClickReject} size="lg" variant="secondary">
          거부
        </Button>
        <Button onClick={onClickApprove} size="lg" variant="primary">
          승인
        </Button>
      </div>
    </div>
  )
}
