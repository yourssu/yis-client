import clsx from 'clsx'
import { tv } from 'tailwind-variants'

import { userKey } from '@/apis/keys'
import { getUser } from '@/apis/user'
import { Conversation } from '@/components/Conversation'
import { ApplicationType } from '@/types/application'
import { DeploymentStateKRNameMap, DeploymentType } from '@/types/deployment'
import { preventSuspenseRequest } from '@/utils/query'
import { useSuspenseQuery } from '@tanstack/react-query'

interface ApplicationDeploymentDetailConversationProps {
  applicationUser: Pick<ApplicationType['user'], 'avatarId' | 'nickname'>
  deployment: DeploymentType
}

const conversationLabel = tv({
  variants: {
    type: {
      APPROVAL: 'text-green800',
      REQUEST: 'text-yellow800',
      RETURN: 'text-red700',
    },
  },
})

export const ApplicationDeploymentDetailConversation = ({
  applicationUser,
  deployment,
}: ApplicationDeploymentDetailConversationProps) => {
  const { data: admin } = useSuspenseQuery({
    queryKey: userKey.detail(deployment.adminId ?? -1),
    queryFn: deployment.adminId
      ? () => getUser(deployment.adminId!)
      : preventSuspenseRequest({ fallback: null }), // undefined로 변경하지 말아주세요.
  })

  const getAdminConversationState = () => {
    return deployment.state === 'REQUEST' ? 'RETURN' : deployment.state
  }

  return (
    <div
      className={clsx(
        'flex gap-4',
        deployment.state === 'REQUEST' ? 'flex-col-reverse' : 'flex-col'
      )}
    >
      <Conversation
        message={deployment.message}
        profileLabel={<span className={conversationLabel({ type: 'REQUEST' })}>요청</span>}
        user={{
          avatarId: applicationUser.avatarId,
          nickname: applicationUser.nickname,
        }}
      />
      {admin && (
        <Conversation
          message={deployment.comment}
          profileLabel={
            <span className={conversationLabel({ type: getAdminConversationState() })}>
              {DeploymentStateKRNameMap[getAdminConversationState()]}
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
