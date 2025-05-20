import { Button } from '@/components/Button'
import { useCreateApplicationFunnelDialog } from '@/routes/~_auth/~(index)/hooks/useCreateApplicationFunnelDialog'

export const NoApplicationLanding = () => {
  const openCreateApplicationFunnelDialog = useCreateApplicationFunnelDialog()

  return (
    <div className="mx-auto mt-[13vh] flex flex-col items-center gap-6">
      <img alt="server" className="mx-auto size-50" src="/Server.png" />
      <div className="text-neutralMuted mb-6 text-xl font-semibold">
        아직 배포된 서비스가 없어요.
      </div>
      <Button onClick={openCreateApplicationFunnelDialog} size="lg" variant="primary">
        서비스 배포하기
      </Button>
    </div>
  )
}
