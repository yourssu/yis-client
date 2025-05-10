import { MdCommit } from 'react-icons/md'

import { ApplicationType } from '@/types/application'

interface ApplicationCardProps {
  application: ApplicationType
}

export const ApplicationCard = ({ application }: ApplicationCardProps) => {
  return (
    <div className="bg-grey50 flex flex-col gap-3 rounded-xl px-6 py-5">
      <div className="text-neutralMuted flex items-center gap-1 text-sm">
        <MdCommit className="size-5" />
        아직 배포된 내용이 없어요
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-17 font-semibold">{application.name}</div>
        {application.description && (
          <div className="text-neutralSubtle text-sm">{application.description}</div>
        )}
      </div>
    </div>
  )
}
