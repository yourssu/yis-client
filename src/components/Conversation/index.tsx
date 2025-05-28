import { DateArg } from 'date-fns'

import { ProfileAvatar } from '@/components/ProfileAvatar'
import { formatToKoreanRelativeDate } from '@/utils/date'

interface ConversationProps {
  at?: DateArg<Date>
  message: string | undefined
  profileLabel: React.ReactNode
  user: {
    avatarId: number
    nickname: string
  }
}

export const Conversation = ({ user, message, profileLabel, at }: ConversationProps) => {
  return (
    <div className="flex gap-3">
      <div className="flex w-fit flex-col items-center gap-1">
        <div className="flex size-9 shrink-0 items-center justify-center">
          <ProfileAvatar avatarId={user.avatarId} rounded size={32} />
        </div>
        <div className="text-13 font-semibold">{profileLabel}</div>
      </div>
      <div className="flex grow flex-col">
        <div className="text-15 mb-1 flex h-9 items-center">
          <div className="font-semibold">{user.nickname}</div>
          {at && (
            <div className="text-neutralMuted">
              <span className="mx-1.5">·</span>
              {formatToKoreanRelativeDate(at)}
            </div>
          )}
        </div>
        <div className="text-neutralMuted text-15">{message ? message : '-'}</div>
      </div>
    </div>
  )
}
