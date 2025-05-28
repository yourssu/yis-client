import clsx from 'clsx'
import { tv } from 'tailwind-variants'

import { userKey } from '@/apis/keys'
import { getUser } from '@/apis/user'
import { Conversation } from '@/components/Conversation'
import { ApplicationType } from '@/types/application'
import { DeploymentStateKRNameMap, DeploymentStateNames, DeploymentType } from '@/types/deployment'
import { preventSuspenseRequest } from '@/utils/query'
import { useSuspenseQuery } from '@tanstack/react-query'

interface DeplouymentStateListDetailConversationProps {
  application: ApplicationType
  deployment: DeploymentType
  state: DeploymentStateNames
}

const conversationLabel = tv({
  variants: {
    type: {
      승인: 'text-green800',
      요청: 'text-yellow800',
      거절: 'text-red700',
    },
  },
})

export const DeploymentStateListDetailConversation = ({
  application,
  deployment,
  state,
}: DeplouymentStateListDetailConversationProps) => {
  const { data: admin } = useSuspenseQuery({
    queryKey: userKey.detail(deployment.adminId ?? -1),
    queryFn: deployment.adminId
      ? () => getUser(deployment.adminId!)
      : preventSuspenseRequest({ fallback: null }), // undefined로 변경하지 말아주세요.
  })

  return (
    <div className={clsx('flex gap-4', state === 'REQUEST' ? 'flex-col-reverse' : 'flex-col')}>
      <Conversation
        message={deployment.message}
        profileLabel={<span className={conversationLabel({ type: '요청' })}>요청</span>}
        user={{
          avatarId: application.user.avatarId,
          nickname: application.user.nickname,
        }}
      />
      {admin && (
        <Conversation
          message={deployment.comment}
          profileLabel={
            <span className={conversationLabel({ type: '요청' })}>
              {state === 'REQUEST'
                ? DeploymentStateKRNameMap['RETURN']
                : DeploymentStateKRNameMap[state]}
            </span>
          }
          user={{
            avatarId: admin.avatarId,
            nickname: admin.nickname,
          }}
        />
      )}
    </div>
  )
}
