import { MdLockOutline } from 'react-icons/md'
import { RiUserSmileLine } from 'react-icons/ri'
import { TbLogout2 } from 'react-icons/tb'
import { tv } from 'tailwind-variants'

import { signout } from '@/apis/auth'
import { UserRoleBadge } from '@/components/Badges/UserRoleBadge'
import { Divider } from '@/components/Divider'
import { Menu } from '@/components/Menu'
import { ProfileAvatar } from '@/components/ProfileAvatar'
import { useSuspensedMe } from '@/hooks/useMe'
import { useToast } from '@/hooks/useToast'
import { useNavigate } from '@tanstack/react-router'

const content = tv({
  slots: {
    avatar: 'size-12 overflow-hidden rounded-full',
    nicknameStyle: 'text-lg font-semibold',
    emailStyle: 'text-13 !text-neutralSubtle font-medium',
    buttonItem: 'text-neutralMuted flex w-full items-center gap-2.5 rounded-md px-4 py-2.5 text-sm',
    buttonIcon: 'size-4.5',
  },
})

export const ProfileMenu = () => {
  const { avatar, nicknameStyle, emailStyle, buttonItem, buttonIcon } = content()

  const toast = useToast()
  const navigate = useNavigate()
  const { id, nickname, email, role } = useSuspensedMe()

  return (
    <Menu>
      <Menu.Target>
        <div className="size-9 cursor-pointer overflow-hidden rounded-full">
          <ProfileAvatar userId={id} />
        </div>
      </Menu.Target>

      <Menu.Content align="end" sideOffset={8}>
        <div className="bg-grey100 flex min-w-[280px] flex-col items-center gap-3 rounded-lg p-4">
          <div className={avatar()}>
            <ProfileAvatar userId={id} />
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-2">
              <div className={nicknameStyle()}>{nickname}</div>
              <UserRoleBadge role={role} size="sm" />
            </div>
            <div className={emailStyle()}>{email}</div>
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
            {role === 'ADMIN' && (
              <Menu.ButtonItem
                className={buttonItem()}
                onClick={() => {
                  navigate({ to: '/admin' })
                }}
              >
                <MdLockOutline className={buttonIcon()} />
                관리자 페이지
              </Menu.ButtonItem>
            )}
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
