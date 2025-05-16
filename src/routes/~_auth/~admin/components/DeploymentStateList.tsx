import { compareDesc } from 'date-fns'
import { MdKeyboardArrowRight } from 'react-icons/md'

import { getDeploymentsByStateWithApplication } from '@/apis/deployment'
import { Button } from '@/components/Button'
import { DetailList } from '@/components/DetailList'
import { Divider } from '@/components/Divider'
import { ProfileAvatar } from '@/components/ProfileAvatar'
import { DeploymentStateNames } from '@/types/deployment'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

interface DeploymentStateListProps {
  state: DeploymentStateNames
}

export const DeploymentStateList = ({ state }: DeploymentStateListProps) => {
  const { data: deployments } = useSuspenseInfiniteQuery({
    queryKey: ['deployments', state],
    queryFn: ({ pageParam }) =>
      getDeploymentsByStateWithApplication({
        state,
        skip: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      const next = lastPage.currentLimit + lastPage.currentSkip
      return next < lastPage.totalCount ? next : undefined
    },
    initialPageParam: 0,
  })

  const sortedDeployments = [...deployments.pages.map((deployment) => deployment.data)]
    .flat()
    .sort((a, b) => compareDesc(a.updatedAt, b.updatedAt))

  return (
    <>
      <DetailList.List>
        {sortedDeployments.map((deployment, index) => (
          <DetailList.ListItem
            description={deployment.application.description}
            footer={<MdKeyboardArrowRight className="size-5" />}
            header={
              <div className="flex flex-col items-center gap-1">
                <div className="size-7 overflow-hidden rounded-full">
                  <ProfileAvatar avatarId={deployment.application.user.avatarId} />
                </div>
                <div className="text-neutralMuted text-xs font-semibold">
                  {deployment.application.user.nickname}
                </div>
              </div>
            }
            index={index}
            key={deployment.id}
            text={deployment.application.name}
          />
        ))}
      </DetailList.List>
      <DetailList.Detail>
        {({ index }) => {
          const deployment = sortedDeployments[index]

          const listPairs = [
            {
              label: '도메인',
              value: deployment.domainName,
            },
            {
              label: '포트 번호',
              value: deployment.port,
            },
            {
              label: '도커 이미지 주소',
              value: deployment.imageUrl,
            },
            {
              label: 'CPU Request',
              value: deployment.cpuRequests,
            },
            {
              label: 'CPU Limit',
              value: deployment.cpuLimits,
            },
            {
              label: 'Memory Request',
              value: deployment.memoryRequests,
            },
            {
              label: 'Memory Limit',
              value: deployment.memoryLimits,
            },
          ]

          return (
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="mb-1 text-lg font-semibold">{deployment.application.name}</div>
                  <div className="text-neutralSubtle text-sm">
                    {deployment.application.description}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="size-10 overflow-hidden rounded-full">
                    <ProfileAvatar avatarId={deployment.application.user.avatarId} />
                  </div>
                  <div className="text-neutralMuted text-15 font-semibold">
                    {deployment.application.user.nickname}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {listPairs.map(({ label, value }) => (
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-neutralMuted">{label}</div>
                    <div>{value}</div>
                  </div>
                ))}
              </div>
              <Divider />
              <div className="text-sm">
                <div className="text-neutralMuted mb-2">
                  {deployment.application.user.nickname}님이 남긴 메시지
                </div>
                <div>{deployment.message ? deployment.message : '-'}</div>
              </div>
              <Divider />
              <div className="grid grid-cols-2 gap-2">
                <Button size="lg" variant="secondary">
                  거부
                </Button>
                <Button size="lg" variant="primary">
                  승인
                </Button>
              </div>
            </div>
          )
        }}
      </DetailList.Detail>
    </>
  )
}
