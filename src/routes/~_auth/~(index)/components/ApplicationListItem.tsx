import { MdLink } from 'react-icons/md'
import { tv } from 'tailwind-variants'

import { ApplicationClusterIndicator } from '@/routes/~_auth/~(index)/components/ApplicationClusterIndicator'
import { ResourceChip } from '@/routes/~_auth/~(index)/components/ResourceChip'
import { FullApplicationType } from '@/types/application'
import { DeploymentStateNames } from '@/types/deployment'
import { formatToKoreanRelativeDate } from '@/utils/date'
import { Link } from '@tanstack/react-router'

interface ApplicationListItemProps {
  application: FullApplicationType
}

const deploymentReview = tv({
  base: 'font-medium',
  variants: {
    deploymentState: {
      REQUEST: 'text-orange500',
      APPROVAL: 'text-green500',
      RETURN: 'text-red500',
    },
  },
})

export const ApplicationListItem = ({ application }: ApplicationListItemProps) => {
  return (
    <Link
      params={{ applicationId: application.id.toString() }}
      search={{ tab: 'overview' }}
      to="/application/$applicationId"
    >
      <div className="bg-grey50 hover:bg-grey100 ease-ease flex flex-col gap-4 rounded-md px-4 py-3 transition-colors duration-200">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="text-15 -ml-1.5 flex items-center gap-0.5 font-medium">
              <ApplicationClusterIndicator clusterStatus={application.clusterStatus} />
              {application.name}
            </div>
            <div className="inline-flex">
              <div className="text-neutralMuted flex items-center gap-1.5 text-xs">
                <MdLink className="size-4" />
                {application.recentDeployment.domainName}:{application.recentDeployment.port}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ResourceChip
              limit={application.recentDeployment.cpuLimits}
              request={application.recentDeployment.cpuRequests}
              type="CPU"
            />
            <ResourceChip
              limit={application.recentDeployment.memoryLimits}
              request={application.recentDeployment.memoryRequests}
              type="MEMORY"
            />
          </div>
        </div>

        <div className="border-grey200 text-neutralSubtle hover:bg-greyOpacity100 ease-ease flex items-center justify-between rounded-sm border px-2 py-1 text-xs transition-colors duration-200">
          <div className="flex items-center gap-1.5">
            <div
              className={deploymentReview({ deploymentState: application.recentDeployment.state })}
            >
              {deploymentStateNameMap[application.recentDeployment.state]}
            </div>
            <div>{application.recentDeployment.imageUrl}</div>
          </div>
          <div>{formatToKoreanRelativeDate(application.recentDeployment.updatedAt)}</div>
        </div>
      </div>
    </Link>
  )
}

const deploymentStateNameMap = {
  REQUEST: '배포 요청',
  APPROVAL: '배포 승인',
  RETURN: '배포 거절',
} as const satisfies Record<DeploymentStateNames, string>
