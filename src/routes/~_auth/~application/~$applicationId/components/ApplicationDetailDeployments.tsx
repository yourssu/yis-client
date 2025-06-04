import { MdOutlineArrowCircleUp } from 'react-icons/md'
import { tv } from 'tailwind-variants'

import { getApplicationDeployments } from '@/apis/application'
import { applicationKey } from '@/apis/keys'
import { DetailList } from '@/components/DetailList'
import { Divider } from '@/components/Divider'
import { ApplicationDeploymentDetail } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDeploymentDetail'
import { FullApplicationType } from '@/types/application'
import { DeploymentStateKRNameMap } from '@/types/deployment'
import { formatTemplates } from '@/utils/date'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

interface ApplicationDetailDeploymentsProps {
  application: FullApplicationType
}

const deploymentStatus = tv({
  base: 'font-semibold',
  variants: {
    state: {
      APPROVAL: 'text-green500',
      REQUEST: 'text-orange500',
      RETURN: 'text-red500',
    },
  },
})

export const ApplicationDetailDeployments = ({
  application,
}: ApplicationDetailDeploymentsProps) => {
  const { data } = useSuspenseInfiniteQuery({
    queryKey: applicationKey.deployments(application.id),
    queryFn: ({ pageParam }) =>
      getApplicationDeployments({
        applicationId: application.id,
        skip: pageParam,
        orderBy: 'UPDATED_AT_DESC',
      }),
    getNextPageParam: (lastPage) => {
      const next = lastPage.currentLimit + lastPage.currentSkip
      return next < lastPage.totalCount ? next : undefined
    },
    initialPageParam: 0,
  })

  const deployments = data.pages.flatMap(({ data }) => data)
  const recentApprovedDeployment = deployments.find((v) => v.isApplied && v.state === 'APPROVAL')

  return (
    <>
      <Divider />
      <DetailList defaultSelectedId={deployments[0].id}>
        <DetailList.List>
          {deployments.map((deployment) => (
            <DetailList.ListItem
              description={deployment.imageUrl}
              footer={
                <div className="text-13 text-neutralSubtle flex items-center gap-3 pr-2.5">
                  <div>
                    {formatTemplates['(2024년)? 2월 3일, 오후 10:23'](deployment.updatedAt)}
                  </div>
                  <div className="text-grey200">|</div>
                  <div className={deploymentStatus({ state: deployment.state })}>
                    배포 {DeploymentStateKRNameMap[deployment.state]}
                  </div>
                </div>
              }
              header={
                <div className="text-violet600 text-15 flex w-[32px] items-center justify-center font-semibold">
                  {deployment.id}
                </div>
              }
              id={deployment.id}
              key={deployment.id}
              text={
                <div className="flex items-center gap-2">
                  {deployment.domainName}:{deployment.port}
                  {recentApprovedDeployment?.id === deployment.id && (
                    <div className="bg-violet600 flex items-center gap-1 rounded-full py-0.5 pr-2 pl-1.5 text-[11px]">
                      <MdOutlineArrowCircleUp className="size-4" />
                      배포
                    </div>
                  )}
                </div>
              }
            />
          ))}
        </DetailList.List>
        <DetailList.Detail>
          {({ id }) => {
            const deployment = deployments.find((deployment) => deployment.id === id)
            if (!deployment) {
              return undefined
            }
            return (
              <ApplicationDeploymentDetail
                application={application}
                deployment={deployment}
                isRecentApproved={recentApprovedDeployment?.id === deployment.id}
              />
            )
          }}
        </DetailList.Detail>
      </DetailList>
    </>
  )
}
