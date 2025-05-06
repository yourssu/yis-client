import { tv } from 'tailwind-variants'

import { UserRoleType } from '@/types/user'

interface UserRoleBadgeProps {
  role: UserRoleType
  size: 'lg' | 'sm'
}

const badge = tv({
  base: 'rounded-sm text-xs font-semibold',
  variants: {
    role: {
      ADMIN: 'bg-brandPrimary',
      USER: 'bg-yellow100 text-yellow600',
    },
    size: {
      lg: 'px-1.5 py-0.5',
      sm: 'px-1 py-0',
    },
  },
})

const roleNames: Record<UserRoleType, string> = {
  ADMIN: '관리자',
  USER: '일반',
}

export const UserRoleBadge = ({ role, size }: UserRoleBadgeProps) => {
  return <div className={badge({ role, size })}>{roleNames[role]}</div>
}
