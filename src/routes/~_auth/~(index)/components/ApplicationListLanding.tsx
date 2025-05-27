import { Button } from '@/components/Button'
import { ApplicationListItem } from '@/routes/~_auth/~(index)/components/ApplicationListItem'
import { useCreateApplicationFunnelDialog } from '@/routes/~_auth/~(index)/hooks/useCreateApplicationFunnelDialog'
import { FullApplicationType } from '@/types/application'

interface ApplicationListLandingProps {
  applications: FullApplicationType[]
}

export const ApplicationListLanding = ({ applications }: ApplicationListLandingProps) => {
  const openCreateApplicationFunnelDialog = useCreateApplicationFunnelDialog()

  return (
    <div>
      <div className="mx-auto flex w-full max-w-[800px] flex-col gap-4">
        <div className="flex items-center justify-between py-2">
          <div className="text-2xl font-semibold">내 서비스</div>
          <Button onClick={openCreateApplicationFunnelDialog} size="sm" variant="primary">
            서비스 배포하기
          </Button>
        </div>
        {applications.map(
          (application) =>
            application.recentDeployment && (
              <ApplicationListItem application={application} key={application.id} />
            )
        )}
      </div>
    </div>
  )
}
