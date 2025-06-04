import { MdMoreHoriz } from 'react-icons/md'

import { IconButton } from '@/components/IconButton'
import { Menu } from '@/components/Menu'
import { UserDeleteMenuButton } from '@/routes/~_auth/~admin/~users/components/UserDeleteButton'
import { UserEditButton } from '@/routes/~_auth/~admin/~users/components/UserEditButton'
import { UserType } from '@/types/user'

interface UserMenuProps {
  user: UserType
}

export const UserMenu = ({ user }: UserMenuProps) => {
  return (
    <Menu>
      <Menu.Target>
        <IconButton size="sm">
          <MdMoreHoriz className="text-neutralMuted size-5" />
        </IconButton>
      </Menu.Target>
      <Menu.Content
        align="end"
        className="bg-grey100 min-w-[180px] rounded-lg p-1.5 text-sm"
        sideOffset={6}
      >
        <UserEditButton user={user} />
        <UserDeleteMenuButton userId={user.id} />
      </Menu.Content>
    </Menu>
  )
}
