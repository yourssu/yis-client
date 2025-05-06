import clsx from 'clsx'

import { ProfileMenu } from '@/components/GNB/ProfileMenu'
import { useAuth } from '@/components/Providers/AuthProvider/hook'
import { Link } from '@tanstack/react-router'

interface GNBProps {
  transparent?: boolean
}

export const GNB = ({ transparent }: GNBProps) => {
  const { isAuthenticated } = useAuth()
  return (
    <div
      className={clsx(
        'sticky top-0 z-10 flex h-[60px] w-full shrink-0 items-center justify-between px-5',
        transparent ? 'bg-transparent' : 'bg-background'
      )}
    >
      <Link className="flex h-10 items-center" to="/">
        <img alt="logo" className="h-4.5" src="/Logo.png" />
      </Link>
      {isAuthenticated() && <ProfileMenu />}
    </div>
  )
}
