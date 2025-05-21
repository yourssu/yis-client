import { Separated } from 'react-simplikit'

import { Divider } from '@/components/Divider'
import { ItemList } from '@/components/ItemList'
import { FullApplicationType } from '@/types/application'
import { formatTemplates } from '@/utils/date'

interface ApplicationDetailOverviewProps {
  application: FullApplicationType
}

export const ApplicationDetailOverview = ({
  application: fullApplication,
}: ApplicationDetailOverviewProps) => {
  const { recentDeployment, ...application } = fullApplication

  const pairs = {
    info: [
      {
        label: '서비스 ID',
        value: application.id,
      },
      {
        label: '이름',
        value: application.name,
      },
      {
        label: '설명',
        value: application.description ? application.description : '-',
      },
      {
        label: '생성 시각',
        value: formatTemplates['(2024년)? 2월 3일, 오후 10:23'](application.createdAt),
      },
    ],
    deployment: [
      {
        label: '도메인',
        value: recentDeployment.domainName,
      },
      {
        label: '포트',
        value: recentDeployment.port,
      },
      {
        label: '도커 이미지 주소',
        value: recentDeployment.imageUrl,
      },
      {
        label: 'CPU Request / Limit',
        value: `${recentDeployment.cpuRequests} / ${recentDeployment.cpuLimits}`,
      },
      {
        label: 'Memory Request / Limit',
        value: `${recentDeployment.memoryRequests} / ${recentDeployment.memoryLimits}`,
      },
    ],
  }

  return (
    <div>
      <div className="mb-3 pt-1 text-sm font-semibold">서비스 상세</div>
      <div className="flex h-fit w-full gap-8">
        <ItemList>
          <ItemList.Body>
            <Separated by={<Divider />}>
              {pairs.info.map((pair) => (
                <div className="px-2">
                  <ItemList.Item key={pair.label} label={pair.label}>
                    {pair.value}
                  </ItemList.Item>
                </div>
              ))}
            </Separated>
          </ItemList.Body>
        </ItemList>
        <ItemList>
          <ItemList.Body>
            <Separated by={<Divider />}>
              {pairs.deployment.map((pair) => (
                <div className="px-2">
                  <ItemList.Item key={pair.label} label={pair.label}>
                    {pair.value}
                  </ItemList.Item>
                </div>
              ))}
            </Separated>
          </ItemList.Body>
        </ItemList>
      </div>
    </div>
  )
}
