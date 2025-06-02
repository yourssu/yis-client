import { useState } from 'react'
import { SwitchCase } from 'react-simplikit'

import { ClusterPodContent } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDetailCluster/ClusterPodContent'
import { ClusterStatusContent } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDetailCluster/ClusterStatusContent'
import { ClusterTabButton } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDetailCluster/ClusterTabButton'
import { ApplicationClusterStatusType } from '@/types/application'

type ClusterTab = '상태' | '파드 현황'

interface ApplicationDetailClusterProps {
  clusterStatus: ApplicationClusterStatusType | undefined
}

export const ApplicationDetailCluster = ({ clusterStatus }: ApplicationDetailClusterProps) => {
  const [tab, setTab] = useState<ClusterTab>('상태')

  if (!clusterStatus) {
    return <div className="text-grey500 text-center">클러스터 정보가 없습니다.</div>
  }

  return (
    <div className="bg-grey50 rounded-2xl p-4">
      <div className="flex gap-4">
        <div className="flex w-fit min-w-[180px] shrink-0 flex-col gap-1">
          <ClusterTabButton onClick={() => setTab('상태')} selected={tab === '상태'}>
            정보
          </ClusterTabButton>
          <ClusterTabButton onClick={() => setTab('파드 현황')} selected={tab === '파드 현황'}>
            파드
          </ClusterTabButton>
        </div>
        <div className="grow px-4 py-2">
          <SwitchCase
            caseBy={{
              '파드 현황': () => <ClusterPodContent clusterStatus={clusterStatus} />,
              상태: () => <ClusterStatusContent clusterStatus={clusterStatus} />,
            }}
            value={tab}
          />
        </div>
      </div>
    </div>
  )
}
