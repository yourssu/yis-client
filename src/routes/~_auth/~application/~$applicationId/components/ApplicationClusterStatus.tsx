import { tv } from 'tailwind-variants'

import {
  ClusterStatusSummary,
  useApplicationClusterStatus,
} from '@/hooks/useApplicationClusterStatus'
import { ApplicationClusterStatusType } from '@/types/application'

interface ApplicationClusterStatusProps {
  clusterStatus: ApplicationClusterStatusType
}

const indicator = tv({
  base: 'size-2.5 rounded-full',
  variants: {
    status: {
      '배포 성공': 'bg-green500 animate-pulse',
      '배포 중': 'bg-orange500 animate-pulse',
      '배포 실패': 'bg-red500',
      '초기화 중': 'bg-grey500',
    },
  },
})

export const ApplicationClusterStatus = ({ clusterStatus }: ApplicationClusterStatusProps) => {
  const { summary, runningPodCount } = useApplicationClusterStatus(clusterStatus)

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-2">
        <div className={indicator({ status: summary })} />
        <div className="text-neutralMuted text-sm font-medium">{statusText[summary]}</div>
      </div>
      <div className="bg-grey300 h-3 w-[1px]" />
      <div className="text-neutralMuted flex items-center gap-1 text-sm font-medium">
        POD {''}
        {runningPodCount} / {clusterStatus.pods.length}
      </div>
    </div>
  )
}

const statusText: Record<ClusterStatusSummary, string> = {
  '배포 성공': '정상 작동 중이에요',
  '배포 중': '배포 중인 파드가 있어요',
  '배포 실패': '배포에 실패했어요',
  '초기화 중': '파드 초기화 중이에요',
}
