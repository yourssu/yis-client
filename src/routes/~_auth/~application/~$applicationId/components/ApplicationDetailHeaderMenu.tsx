import { IoMdTrash } from 'react-icons/io'
import { MdMoreHoriz } from 'react-icons/md'

import { IconButton } from '@/components/IconButton'
import { Menu } from '@/components/Menu'
import { useAlertDialog } from '@/hooks/useAlertDialog'
import { ApplicationDeleteDialog } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDeleteDialog'
import { FullApplicationType } from '@/types/application'
import { useNavigate } from '@tanstack/react-router'

interface ApplicationDetailHeaderMenuProps {
  application: FullApplicationType
}

export const ApplicationDetailHeaderMenu = ({ application }: ApplicationDetailHeaderMenuProps) => {
  const openDeleteConfirmAlertDialog = useAlertDialog()
  const navigate = useNavigate()

  const onClickDelete = async () => {
    const deleted = await openDeleteConfirmAlertDialog({
      title: '정말 서비스를 삭제할까요?',
      closeButton: true,
      closeableWithOutside: false,
      content: ({ closeAsTrue }) => (
        <ApplicationDeleteDialog application={application} closeDialog={closeAsTrue} />
      ),
    })

    if (deleted) {
      navigate({ to: '/', replace: true })
    }
  }

  return (
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
        <Menu.ButtonItem
          className="flex items-center gap-1 rounded-md px-3 py-2"
          onClick={onClickDelete}
        >
          <IoMdTrash className="text-red500 size-4.5" />
          서비스 삭제하기
        </Menu.ButtonItem>
      </Menu.Content>
    </Menu>
  )
}
