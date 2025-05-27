import React from 'react'
import { tv } from 'tailwind-variants'

import { HoverTooltip } from '@/components/HoverTooltip'
import {
  ClusterStatusSummary,
  useApplicationClusterStatus,
} from '@/hooks/useApplicationClusterStatus'
import { ApplicationClusterStatusType } from '@/types/application'

interface ApplicationClusterIndicatorProps {
  clusterStatus: ApplicationClusterStatusType | undefined
}

const indicator = tv({
  slots: {
    body: 'size-2 rounded-full',
    tooltip: 'font-bold',
  },

  variants: {
    status: {
      '배포 성공': {
        body: 'bg-green500 animate-pulse',
        tooltip: 'text-green500',
      },
      '배포 중': { body: 'bg-orange500 animate-pulse', tooltip: 'text-orange500' },
      '배포 실패': { body: 'bg-red500', tooltip: 'text-red500' },
      '초기화 중': { body: 'bg-grey500 animate-pulse', tooltip: 'text-grey500' },
      '승인 대기 중': { body: 'bg-grey500', tooltip: 'text-grey500' },
    },
  },
})

const IndicatorTooltipContent = ({
  type,
  children,
}: React.PropsWithChildren<{ type: ClusterStatusSummary }>) => {
  const { tooltip } = indicator()

  return (
    <div className="flex items-center gap-2">
      <div className={tooltip({ status: type })}>{type}</div>
      {children}
    </div>
  )
}

export const ApplicationClusterIndicator = ({
  clusterStatus,
}: ApplicationClusterIndicatorProps) => {
  const { summary } = useApplicationClusterStatus(clusterStatus)

  const { body } = indicator()

  return (
    <HoverTooltip
      color="grey200"
      content={
        <IndicatorTooltipContent type={summary}>
          {indicatorTooltipText[summary]}
        </IndicatorTooltipContent>
      }
      contentProps={{
        side: 'left',
      }}
    >
      <div className="hover:bg-grey200 ease-ease rounded-sm p-1.5 transition-colors duration-200">
        <div className={body({ status: summary })} />
      </div>
    </HoverTooltip>
  )
}

const indicatorTooltipText: Record<ClusterStatusSummary, string> = {
  '승인 대기 중': '배포 승인을 기다리고 있어요.',
  '초기화 중': '아직 POD가 생성 중이거나 초기 상태에 있어요.',
  '배포 성공': '배포가 성공적으로 완료됐어요.',
  '배포 실패': '배포 중 오류가 발생했어요.',
  '배포 중': '배포가 진행 중이에요.',
}
