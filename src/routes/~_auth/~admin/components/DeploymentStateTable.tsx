import { invert } from 'es-toolkit'
import { Suspense, useState } from 'react'

import { DetailList } from '@/components/DetailList'
import { DeploymentStateList } from '@/routes/~_auth/~admin/components/DeploymentStateList'
import { DeploymentStateNames } from '@/types/deployment'

export const DeploymentStateTable = () => {
  const [deploymentState, setDeploymentState] = useState<DeploymentStateNames>('REQUEST')

  return (
    <div className="w-full">
      <DetailList
        defaultTab="요청"
        id="어드민 배포 목록"
        onTabChange={(v) => setDeploymentState(invert(TabStateNameMap)[v])}
        tabs={DeploymentStateNames.map((v) => TabStateNameMap[v])}
      >
        <Suspense>
          <DeploymentStateList state={deploymentState} />
        </Suspense>
      </DetailList>
    </div>
  )
}

const TabStateNameMap = {
  REQUEST: '요청',
  APPROVAL: '승인',
  RETURN: '거절',
} as const
