import { MdOutlineArrowCircleUp } from 'react-icons/md'
import { tv } from 'tailwind-variants'

import { getApplicationDeployments } from '@/apis/application'
import { applicationKey } from '@/apis/keys'
import { DetailList } from '@/components/DetailList'
import { Divider } from '@/components/Divider'
import { FullApplicationType } from '@/types/application'
import { DeploymentStateNames } from '@/types/deployment'
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
  const deployedId = deployments[0].id // Todo: 실제로 계산해야 함

  return (
    <>
      <Divider />
      <DetailList defaultSelectedId={deployedId}>
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
                    {deploymentStatusNameMap[deployment.state]}
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
                  {deployedId === deployment.id && (
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
              <div className="flex flex-col gap-2">
                <div className="text-neutralMuted text-sm font-semibold">배포 ID</div>
                <div className="text-neutralSubtle text-sm font-semibold">{deployment.id}</div>
              </div>
            )
          }}
        </DetailList.Detail>
      </DetailList>
    </>
  )
}

const deploymentStatusNameMap = {
  APPROVAL: '배포 승인',
  REQUEST: '배포 요청',
  RETURN: '배포 반력',
} as const satisfies Record<DeploymentStateNames, string>
