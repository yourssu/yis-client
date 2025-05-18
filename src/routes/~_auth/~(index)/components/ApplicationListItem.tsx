import clsx from 'clsx'

import { DomainLink } from '@/routes/~_auth/~(index)/components/DomainLink'
import { ResourceChip } from '@/routes/~_auth/~(index)/components/ResourceChip'
import { ApplicationsWithRecentDeploymentItem } from '@/routes/~_auth/~(index)/type'
import { formatToKoreanRelativeDate } from '@/utils/date'
import { Link } from '@tanstack/react-router'

interface ApplicationListItemProps {
  application: ApplicationsWithRecentDeploymentItem
}

export const ApplicationListItem = ({ application }: ApplicationListItemProps) => {
  return (
    <Link params={{ applicationId: application.id.toString() }} to="/application/$applicationId">
      <div className="bg-grey50 hover:bg-grey100 ease-ease flex flex-col gap-4 rounded-md px-4 py-3 transition-colors duration-200">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="text-15 flex items-center gap-2 font-medium">
              <div className="bg-green500 size-2 rounded-full" />
              {application.name}
            </div>
            <div className="inline-flex">
              <DomainLink
                domainName={application.recentDeployment.domainName}
                port={application.recentDeployment.port}
              />
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
              className={clsx(
                'font-medium',
                deploymentStateNameMap[application.recentDeployment.state].color
              )}
            >
              {deploymentStateNameMap[application.recentDeployment.state].name}
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
  REQUEST: {
    name: '배포 요청',
    color: 'text-orange500',
  },
  APPROVAL: {
    name: '배포 승인',
    color: 'text-green500',
  },
  RETURN: {
    name: '배포 거절',
    color: 'text-red500',
  },
} as const
