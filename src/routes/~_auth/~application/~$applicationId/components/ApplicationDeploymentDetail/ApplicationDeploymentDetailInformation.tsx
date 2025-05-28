import { overlay } from 'overlay-kit'
import { MdFileOpen } from 'react-icons/md'

import { InlineButton } from '@/components/InlineButton'
import { ApplicationDeploymentManifestDialog } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDeploymentDetail/ApplicationDeploymentManifestDialog'
import { DeploymentStateKRNameMap, DeploymentType } from '@/types/deployment'
import { assertNonNullish } from '@/utils/assertion'
import { formatTemplates } from '@/utils/date'

interface ApplicationDeploymentDetailProps {
  deployment: DeploymentType
}

export const ApplicationDeploymentDetailInformation = ({
  deployment,
}: ApplicationDeploymentDetailProps) => {
  const onClickManifestButton = () => {
    if (!deployment.manifests || deployment.manifests.length === 0) {
      return
    }
    overlay.open(({ isOpen, close }) => {
      assertNonNullish(deployment.manifests)
      return (
        <ApplicationDeploymentManifestDialog
          close={close}
          isOpen={isOpen}
          manifests={deployment.manifests}
        />
      )
    })
  }

  const listPairs = [
    {
      label: '배포 ID',
      value: deployment.id,
    },
    {
      label: `${DeploymentStateKRNameMap[deployment.state]} 시각`,
      value: formatTemplates['(2024년)? 2월 3일, 오후 10:23'](deployment.updatedAt),
    },
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
      label: 'CPU Request / Limit',
      value: `${deployment.cpuRequests} / ${deployment.cpuLimits}`,
    },
    {
      label: 'Memory Request / Limit',
      value: `${deployment.memoryRequests} / ${deployment.memoryLimits}`,
    },
    {
      label: '메니페스트 파일',
      value: (
        <InlineButton onClick={onClickManifestButton}>
          <div className="text-blue500 flex items-center gap-1">
            <MdFileOpen />
            {deployment.manifests?.length ?? 0}개 파일
          </div>
        </InlineButton>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      {listPairs.map(({ label, value }) => (
        <div className="flex items-center justify-between text-sm" key={label}>
          <div className="text-neutralMuted">{label}</div>
          <div>{value}</div>
        </div>
      ))}
    </div>
  )
}
