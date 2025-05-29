import { Dispatch, SetStateAction } from 'react'
import { IoMdTrash } from 'react-icons/io'
import { MdMoreHoriz, MdRocketLaunch } from 'react-icons/md'

import { IconButton } from '@/components/IconButton'
import { Menu } from '@/components/Menu'
import { ProfileAvatar } from '@/components/ProfileAvatar'
import { useCreateDeploymentFunnelDialog } from '@/hooks/useCreateDeploymentFunnelDialog'
import { useToast } from '@/hooks/useToast'
import { ApplicationClusterStatus } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationClusterStatus'
import { ApplicationDetailPageSearchParams } from '@/routes/~_auth/~application/~$applicationId/type'
import { FullApplicationType } from '@/types/application'

interface ApplicationDetailHeaderProps {
  application: FullApplicationType
  setTab: Dispatch<SetStateAction<ApplicationDetailPageSearchParams['tab']>>
}

export const ApplicationDetailHeader = ({ application, setTab }: ApplicationDetailHeaderProps) => {
  const { user, clusterStatus, recentDeployment } = application

  const toast = useToast()
  const openCreateDeploymentFunnelDialog = useCreateDeploymentFunnelDialog({
    application: {
      id: application.id,
      name: application.name,
    },
  })

  const onClickDeployButton = () => {
    if (recentDeployment.state === 'REQUEST') {
      toast.error('아직 승인되지 않은 배포 내역이 있어요.')
      setTab('deployments')
      return
    }
    if (recentDeployment.state === 'RETURN') {
      toast.error('거절된 배포를 재요청해주세요.')
      setTab('deployments')
      return
    }
    openCreateDeploymentFunnelDialog()
  }

  return (
    <div>
      <div className="mb-2 flex items-center gap-2.5">
        <ProfileAvatar avatarId={user.avatarId} rounded size={28} />
        <div className="text-neutralMuted text-15 font-semibold">{user.nickname}</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-semibold">{application.name}</div>
            <div className="text-neutralMuted text-15">{application.description}</div>
          </div>
          <div className="flex items-center gap-1.5">
            <ApplicationClusterStatus clusterStatus={clusterStatus} />
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <IconButton
            className="text-neutralMuted bg-greyOpacity100 hover:bg-greyOpacity200"
            onClick={onClickDeployButton}
            size="md"
            tooltipContent="배포하기"
          >
            <MdRocketLaunch className="size-5" />
          </IconButton>
          <Menu>
            <Menu.Target asChild>
              <IconButton
                className="text-neutralMuted bg-greyOpacity100 hover:bg-greyOpacity200"
                size="md"
              >
                <MdMoreHoriz className="size-5" />
              </IconButton>
            </Menu.Target>
            <Menu.Content
              align="end"
              className="bg-grey100 min-w-[180px] rounded-lg p-1.5 text-sm"
              sideOffset={6}
            >
              <Menu.ButtonItem className="flex items-center gap-1 rounded-md px-3 py-2">
                <IoMdTrash className="text-red500 size-4.5" />
                서비스 삭제하기
              </Menu.ButtonItem>
            </Menu.Content>
          </Menu>
        </div>
      </div>
    </div>
  )
}
