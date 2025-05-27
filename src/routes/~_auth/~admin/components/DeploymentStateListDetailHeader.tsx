import { ProfileAvatar } from '@/components/ProfileAvatar'
import { ApplicationType } from '@/types/application'

interface DeploymentStateListDetailHeaderProps {
  application: ApplicationType
}

export const DeploymentStateListDetailHeader = ({
  application,
}: DeploymentStateListDetailHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="mb-1 text-lg font-semibold">{application.name}</div>
        <div className="text-neutralSubtle text-sm">{application.description}</div>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <ProfileAvatar avatarId={application.user.avatarId} rounded size={40} />
        <div className="text-neutralMuted text-15 font-semibold">{application.user.nickname}</div>
      </div>
    </div>
  )
}
