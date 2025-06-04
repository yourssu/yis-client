import { DeploymentStateKRNameMap, DeploymentStateNames, DeploymentType } from '@/types/deployment'
import { formatTemplates } from '@/utils/date'

interface DeploymentStateListDetailHeaderProps {
  deployment: DeploymentType
  state: DeploymentStateNames
}

export const DeploymentStateListDetailInformation = ({
  deployment,
  state,
}: DeploymentStateListDetailHeaderProps) => {
  const listPairs = [
    {
      label: `${DeploymentStateKRNameMap[state]} 시각`,
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
