import { GNB } from '@/components/GNB'
import { useFunnelDialog } from '@/hooks/useFunnelDialog'
import { ApplicationFormStep } from '@/routes/~_auth/~(index)/components/CreateApplicationFunnel/ApplicationFormStep'
import { CreateApplicationFunnelSteps } from '@/routes/~_auth/~(index)/components/CreateApplicationFunnel/type'
import { createFileRoute } from '@tanstack/react-router'

const Index = () => {
  const openCreateApplicationFunnelDialog = useFunnelDialog<CreateApplicationFunnelSteps>({
    id: 'create-application',
    initial: {
      step: '어플리케이션_정보입력',
      context: { application: {} },
    },
  })

  const onClick = () => {
    openCreateApplicationFunnelDialog({
      closeableWithOutside: true,
      closeButton: true,
      render: () => ({
        어플리케이션_정보입력: {
          title: '서비스 이름을 알려주세요',
          content: ({ history }) => {
            return (
              <ApplicationFormStep
                onNext={(c) => history.push('배포_정보입력', { application: c, deploy: {} })}
              />
            )
          },
        },
        배포_정보입력: {
          title: '배포 정보 입력',
          content: () => {
            return <div>배포 정보 입력</div>
          },
        },
      }),
    })
  }

  return (
    <div>
      <GNB />

      <div className="mx-auto mt-[13vh] flex flex-col items-center gap-6">
        <img alt="server" className="mx-auto size-50" src="/Server.png" />
        <div className="text-neutralMuted mb-6 text-xl font-semibold">
          아직 배포된 서비스가 없어요.
        </div>
        <button
          className="bg-violet100 text-15 text-brandAdaptive hover:bg-violet200 ease-ease cursor-pointer rounded-xl px-5.5 py-2.5 font-medium transition-colors duration-200"
          onClick={onClick}
        >
          서비스 배포하기
        </button>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_auth/(index)/')({
  component: Index,
})
