import clsx from 'clsx'
import { tv } from 'tailwind-variants'

import { userKey } from '@/apis/keys'
import { getUser } from '@/apis/user'
import { ProfileAvatar } from '@/components/ProfileAvatar'
import { DeploymentStateKRNameMap } from '@/routes/~_auth/~admin/type'
import { ApplicationType } from '@/types/application'
import { DeploymentStateNames, DeploymentType } from '@/types/deployment'
import { preventSuspenseRequest } from '@/utils/query'
import { ValueOf } from '@/utils/type'
import { useSuspenseQuery } from '@tanstack/react-query'

interface DeplouymentStateListDetailConversationProps {
  application: ApplicationType
  deployment: DeploymentType
  state: DeploymentStateNames
}

interface ConversationProps {
  message: string | undefined
  type: ValueOf<typeof DeploymentStateKRNameMap>
  user: Pick<ApplicationType['user'], 'avatarId' | 'nickname'>
}

const conversationLabel = tv({
  base: '!text-13 font-semibold',
  variants: {
    type: {
      승인: 'text-green800',
      요청: 'text-yellow800',
      거절: 'text-red700',
    },
  },
})

const Conversation = ({ user, message, type }: ConversationProps) => {
  return (
    <div className="flex gap-3">
      <div className="flex w-fit flex-col items-center gap-1">
        <div className="flex size-9 shrink-0 items-center justify-center">
          <ProfileAvatar avatarId={user.avatarId} rounded size={32} />
        </div>
        <div className={conversationLabel({ type })}>{type}</div>
      </div>
      <div className="flex grow flex-col">
        <div className="mb-1 flex h-9 items-center">
          <div className="text-15 font-semibold">{user.nickname}</div>
        </div>
        <div className="text-neutralMuted text-15">{message ? message : '-'}</div>
      </div>
    </div>
  )
}

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
        type="요청"
        user={{
          avatarId: application.user.avatarId,
          nickname: application.user.nickname,
        }}
      />
      {admin && (
        <Conversation
          message={deployment.comment}
          type={
            state === 'REQUEST'
              ? DeploymentStateKRNameMap['RETURN']
              : DeploymentStateKRNameMap[state]
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
