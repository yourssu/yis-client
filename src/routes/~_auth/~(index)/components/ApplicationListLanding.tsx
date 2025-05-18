import { ApplicationListItem } from '@/routes/~_auth/~(index)/components/ApplicationListItem'
import { ApplicationsWithRecentDeploymentItem } from '@/routes/~_auth/~(index)/type'

interface ApplicationListLandingProps {
  applications: ApplicationsWithRecentDeploymentItem[]
}

export const ApplicationListLanding = ({ applications }: ApplicationListLandingProps) => {
  return (
    <div>
      <div className="mx-auto flex w-full max-w-[800px] flex-col gap-4">
        <div className="py-2 text-2xl font-semibold">내 서비스</div>
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
