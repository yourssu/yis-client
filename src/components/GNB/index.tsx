import clsx from 'clsx'
import { Suspense } from 'react'

import { ProfileMenu } from '@/components/GNB/ProfileMenu'
import { useAuth } from '@/components/Providers/AuthProvider/hook'
import { Link } from '@tanstack/react-router'

interface GNBProps {
  fixed?: boolean
  transparent?: boolean
}

export const GNB = ({ transparent, fixed }: GNBProps) => {
  const { isAuthenticated } = useAuth()
  return (
    <div
      className={clsx(
        'top-0 z-10 flex h-[60px] w-full shrink-0 items-center justify-between px-5',
        transparent ? 'bg-transparent' : 'bg-background',
        fixed ? 'fixed' : 'sticky'
      )}
    >
      <Link className="flex h-10 items-center" to="/">
        <img alt="logo" className="h-4.5" src="/Logo.png" />
      </Link>
      {isAuthenticated() && (
        <Suspense>
          <ProfileMenu />
        </Suspense>
      )}
    </div>
  )
}
