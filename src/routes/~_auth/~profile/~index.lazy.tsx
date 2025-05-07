import { Suspense } from 'react'

import { GNB } from '@/components/GNB'
import { MyApplicationsSection } from '@/routes/~_auth/~profile/components/MyApplicationsSection'
import { ProfileSection } from '@/routes/~_auth/~profile/components/ProfileSection'
import { createLazyFileRoute } from '@tanstack/react-router'

const Settings = () => {
  return (
    <div>
      <GNB />

      <div className="mx-auto mt-10 flex max-w-[800px] flex-col items-center gap-20">
        <Suspense>
          <ProfileSection />
          <MyApplicationsSection />
        </Suspense>
      </div>
    </div>
  )
}

export const Route = createLazyFileRoute('/_auth/profile/')({
  component: Settings,
})
