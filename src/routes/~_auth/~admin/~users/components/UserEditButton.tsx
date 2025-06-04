import { MdEdit } from 'react-icons/md'

import { useAllUsersInvalidation } from '@/apis/user'
import { Menu } from '@/components/Menu'
import { useEditUserDialog } from '@/hooks/useEditUserDialog'
import { UserType } from '@/types/user'

interface UserEditButtonProps {
  user: UserType
}

export const UserEditButton = ({ user }: UserEditButtonProps) => {
  const openEditUserDialog = useEditUserDialog({ type: 'other', user })
  const invalidateAllUsers = useAllUsersInvalidation()

  const onClick = async () => {
    if (await openEditUserDialog()) {
      invalidateAllUsers()
    }
  }

  return (
    <Menu.ButtonItem
      className="flex items-center gap-2.5 rounded-md px-3 py-2 font-medium"
      onClick={onClick}
    >
      <MdEdit className="text-orange600 size-4.5" />
      수정하기
    </Menu.ButtonItem>
  )
}
