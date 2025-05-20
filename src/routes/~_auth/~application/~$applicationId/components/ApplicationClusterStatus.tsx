import { tv } from 'tailwind-variants'

import { ClusterStatus, useApplicationClusterStatus } from '@/hooks/useApplicationClusterStatus'
import { ApplicationClusterPodType } from '@/types/application'

interface ApplicationClusterStatusProps {
  pods: ApplicationClusterPodType[]
}

const indicator = tv({
  base: 'size-2.5 rounded-full',
  variants: {
    status: {
      running: 'bg-green500 animate-pulse',
      inDeployment: 'bg-orange500 animate-pulse',
      failed: 'bg-red500',
      noPods: 'bg-grey500',
    },
  },
})

export const ApplicationClusterStatus = ({ pods }: ApplicationClusterStatusProps) => {
  const { summary, statusCounts } = useApplicationClusterStatus(pods)

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-2">
        <div className={indicator({ status: summary })} />
        <div className="text-neutralMuted text-sm font-medium">{statusText[summary]}</div>
      </div>
      <div className="bg-grey300 h-3 w-[1px]" />
      <div className="text-neutralMuted flex items-center gap-1 text-sm font-medium">
        POD {''}
        {statusCounts.running} / {pods.length}
      </div>
    </div>
  )
}

const statusText: Record<ClusterStatus, string> = {
  running: '정상 작동 중이에요',
  inDeployment: '배포 중인 파드가 있어요',
  failed: '배포에 실패했어요',
  noPods: '작동 중인 파드가 없어요',
}
