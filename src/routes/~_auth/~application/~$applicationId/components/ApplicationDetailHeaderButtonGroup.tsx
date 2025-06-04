import { Dispatch, SetStateAction } from 'react'
import { MdRocketLaunch } from 'react-icons/md'

import { IconButton } from '@/components/IconButton'
import { useCreateDeploymentFunnelDialog } from '@/hooks/useCreateDeploymentFunnelDialog'
import { useSuspensedMe } from '@/hooks/useMe'
import { useToast } from '@/hooks/useToast'
import { ApplicationDetailHeaderMenu } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDetailHeaderMenu'
import { ApplicationDetailPageSearchParams } from '@/routes/~_auth/~application/~$applicationId/type'
import { FullApplicationType } from '@/types/application'

interface ApplicationDetailHeaderButtonGroupProps {
  application: FullApplicationType
  setTab: Dispatch<SetStateAction<ApplicationDetailPageSearchParams['tab']>>
}

export const ApplicationDetailHeaderButtonGroup = ({
  application,
  setTab,
}: ApplicationDetailHeaderButtonGroupProps) => {
  const { recentDeployment, id, name } = application

  const me = useSuspensedMe()
  const toast = useToast()
  const openCreateDeploymentFunnelDialog = useCreateDeploymentFunnelDialog({
    application: { id, name },
  })

  const showMenu = me.email === application.user.email || me.role === 'ADMIN'

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
    <div className="flex items-center gap-1.5">
      <IconButton
        className="text-neutralMuted bg-greyOpacity100 hover:bg-greyOpacity200"
        onClick={onClickDeployButton}
        size="md"
        tooltipContent="배포하기"
      >
        <MdRocketLaunch className="size-5" />
      </IconButton>
      {showMenu && <ApplicationDetailHeaderMenu application={application} />}
    </div>
  )
}
