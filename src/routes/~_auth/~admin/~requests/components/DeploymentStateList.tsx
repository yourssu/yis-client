import { Dispatch, SetStateAction } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

import { getDeploymentsByStateWithApplication } from '@/apis/deployment'
import { deploymentKey } from '@/apis/keys'
import { DetailList } from '@/components/DetailList'
import { ProfileAvatar } from '@/components/ProfileAvatar'
import { DeploymentStateListDetail } from '@/routes/~_auth/~admin/~requests/components/DeploymentStateListDetail'
import { AdminPageSearchParams } from '@/routes/~_auth/~admin/~requests/type'
import { DeploymentStateKRNameMap, DeploymentStateNames } from '@/types/deployment'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

interface DeploymentStateListProps {
  setActiveDeploymentId: Dispatch<SetStateAction<AdminPageSearchParams['id']>>
  state: DeploymentStateNames
}

export const DeploymentStateList = ({ state, setActiveDeploymentId }: DeploymentStateListProps) => {
  const { data: deployments } = useSuspenseInfiniteQuery({
    queryKey: deploymentKey.state(state),
    queryFn: ({ pageParam }) =>
      getDeploymentsByStateWithApplication({
        state,
        skip: pageParam,
        orderBy: 'UPDATED_AT_DESC',
      }),
    getNextPageParam: (lastPage) => {
      const next = lastPage.currentLimit + lastPage.currentSkip
      return next < lastPage.totalCount ? next : undefined
    },
    initialPageParam: 0,
  })

  const sortedDeployments = deployments.pages.flatMap(({ data }) => data)

  return (
    <DetailList>
      <DetailList.List>
        {sortedDeployments.length ? (
          sortedDeployments.map((deployment) => (
            <DetailList.ListItem
              description={deployment.application.description}
              footer={<MdKeyboardArrowRight className="size-5" />}
              header={
                <div className="flex flex-col items-center gap-1">
                  <ProfileAvatar
                    avatarId={deployment.application.user.avatarId}
                    rounded
                    size={28}
                  />
                  <div className="text-neutralMuted text-xs font-semibold">
                    {deployment.application.user.nickname}
                  </div>
                </div>
              }
              id={deployment.id}
              key={deployment.id}
              onClick={({ close }) => {
                setActiveDeploymentId(close ? deployment.id.toString() : undefined)
              }}
              text={deployment.application.name}
            />
          ))
        ) : (
          <div className="mx-auto flex flex-col items-center gap-6 pt-10">
            <DotLottieReact autoplay className="size-14" src="/lotties/empty-list.lottie" />
            <div className="text-neutralSubtle text-sm font-semibold">
              {DeploymentStateKRNameMap[state]}된 내역이 없어요
            </div>
          </div>
        )}
      </DetailList.List>
      <DetailList.Detail>
        {({ id }) => {
          const deployment = sortedDeployments.find((v) => v.id === id)
          if (!deployment) {
            return undefined
          }
          return (
            <DeploymentStateListDetail
              application={deployment.application}
              deployment={deployment}
              state={state}
            />
          )
        }}
      </DetailList.Detail>
    </DetailList>
  )
}
