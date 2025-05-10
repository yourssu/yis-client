import { Suspense } from 'react'

import { GNB } from '@/components/GNB'
import { useSuspensedMe } from '@/hooks/useMe'
import { createLazyFileRoute, Navigate } from '@tanstack/react-router'

const Admin = () => {
  const { role } = useSuspensedMe()

  if (role !== 'ADMIN') {
    return <Navigate replace to="/404" />
  }

  return (
    <div>
      <GNB />
      어드민
    </div>
  )
}

export const Route = createLazyFileRoute('/_auth/admin/')({
  component: () => (
    <Suspense>
      <Admin />
    </Suspense>
  ),
})
