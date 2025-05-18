import { useSuspensedMe } from '@/hooks/useMe'
import { UserType } from '@/types/user'
import { Navigate } from '@tanstack/react-router'

interface PageValidatorProps {
  validate: (me: UserType) => boolean
}

export const PageValidator = ({
  validate,
  children,
}: React.PropsWithChildren<PageValidatorProps>) => {
  const me = useSuspensedMe()

  if (!validate(me)) {
    return <Navigate replace to="/404" />
  }

  return <>{children}</>
}
