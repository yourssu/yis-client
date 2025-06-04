import { useUserApplicationsInvalidation } from '@/apis/user'
import { Button } from '@/components/Button'
import { useCreateApplicationFunnelDialog } from '@/hooks/useCreateApplicationFunnelDialog'

interface NoApplicationLandingProps {
  meId: number
}

export const NoApplicationLanding = ({ meId }: NoApplicationLandingProps) => {
  const openCreateApplicationFunnelDialog = useCreateApplicationFunnelDialog()
  const invalidateUserApplications = useUserApplicationsInvalidation(meId)

  const onClick = async () => {
    if (await openCreateApplicationFunnelDialog()) {
      invalidateUserApplications()
    }
  }

  return (
    <div className="mx-auto mt-[13vh] flex flex-col items-center gap-6">
      <img alt="server" className="mx-auto size-50" src="/Server.png" />
      <div className="text-neutralMuted mb-6 text-xl font-semibold">
        아직 배포된 서비스가 없어요.
      </div>
      <Button onClick={onClick} size="lg" variant="primary">
        서비스 배포하기
      </Button>
    </div>
  )
}
