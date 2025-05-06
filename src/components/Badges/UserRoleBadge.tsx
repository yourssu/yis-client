import { tv } from 'tailwind-variants'

import { UserRoleType } from '@/types/user'

interface UserRoleBadgeProps {
  role: UserRoleType
}

const badge = tv({
  base: 'rounded-sm px-1 text-xs font-semibold',
  variants: {
    role: {
      ADMIN: 'bg-brandPrimary',
      USER: 'bg-yellow500 text-grey200',
    },
  },
})

const roleNames: Record<UserRoleType, string> = {
  ADMIN: '관리자',
  USER: '일반',
}

export const UserRoleBadge = ({ role }: UserRoleBadgeProps) => {
  return <div className={badge({ role })}>{roleNames[role]}</div>
}
