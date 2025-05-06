import { RiUserSmileLine } from 'react-icons/ri'
import { TbLogout2 } from 'react-icons/tb'
import { tv } from 'tailwind-variants'

import { signout } from '@/apis/auth'
import { UserRoleBadge } from '@/components/Badges/UserRoleBadge'
import { Divider } from '@/components/Divider'
import { Menu } from '@/components/Menu'
import { ProfileAvatar } from '@/components/ProfileAvatar'
import { useToast } from '@/hooks/useToast'
import { useNavigate } from '@tanstack/react-router'

const content = tv({
  slots: {
    avatar: 'size-12 overflow-hidden rounded-full',
    nickname: 'text-lg font-semibold',
    email: 'text-13 !text-neutralSubtle font-medium',
    buttonItem: 'text-neutralMuted flex w-full items-center gap-2.5 rounded-md px-4 py-2.5 text-sm',
    buttonIcon: 'size-4.5',
  },
})

export const ProfileMenu = () => {
  const { avatar, nickname, email, buttonItem, buttonIcon } = content()

  const toast = useToast()
  const navigate = useNavigate()

  return (
    <Menu>
      <Menu.Target>
        <div className="size-9 cursor-pointer overflow-hidden rounded-full">
          <ProfileAvatar />
        </div>
      </Menu.Target>

      <Menu.Content align="end" sideOffset={8}>
        <div className="bg-grey100 flex min-w-[280px] flex-col items-center gap-3 rounded-lg p-4">
          <div className={avatar()}>
            <ProfileAvatar />
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-2">
              <div className={nickname()}>Feca</div>
              <UserRoleBadge role="ADMIN" size="sm" />
            </div>
            <div className={email()}>feca.urssu@gmail.com</div>
          </div>

          <Divider className="mt-2" />

          <div className="flex w-full flex-col">
            <Menu.ButtonItem
              className={buttonItem()}
              onClick={() => {
                navigate({ to: '/profile' })
              }}
            >
              <RiUserSmileLine className={buttonIcon()} />내 정보
            </Menu.ButtonItem>
            <Menu.ButtonItem
              className={buttonItem()}
              onClick={() => {
                signout()
                navigate({ to: '/signin' })
                toast.default('YIS에서 로그아웃 됐어요.')
              }}
            >
              <TbLogout2 className={buttonIcon()} />
              로그아웃
            </Menu.ButtonItem>
          </div>
        </div>
      </Menu.Content>
    </Menu>
  )
}
