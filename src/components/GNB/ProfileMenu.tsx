import { TbLogout2 } from 'react-icons/tb'
import { tv } from 'tailwind-variants'

import { signout } from '@/apis/auth'
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
    roleBadge: 'rounded-sm px-1 text-xs font-semibold',
  },
  variants: {
    role: {
      ADMIN: {
        roleBadge: 'bg-brandPrimary',
      },
      USER: {
        roleBadge: 'bg-yellow500 text-grey200',
      },
    },
  },
})

export const ProfileMenu = () => {
  const { avatar, nickname, email, buttonItem, buttonIcon, roleBadge } = content()

  const toast = useToast()
  const navigate = useNavigate()
  const role: 'ADMIN' | 'USER' = 'ADMIN'

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
              <div className={roleBadge({ role })}>{role === 'ADMIN' ? '관리자' : '일반'}</div>
            </div>
            <div className={email()}>feca.urssu@gmail.com</div>
          </div>

          <Divider className="mt-2" />

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
      </Menu.Content>
    </Menu>
  )
}
