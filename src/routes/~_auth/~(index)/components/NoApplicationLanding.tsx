import { Button } from '@/components/Button'
import { useFunnelDialog } from '@/hooks/useFunnelDialog'
import { ApplicationFormStep } from '@/routes/~_auth/~(index)/components/CreateApplicationFunnel/ApplicationFormStep'
import { DeploymentCompleteStep } from '@/routes/~_auth/~(index)/components/CreateApplicationFunnel/DeploymentCompleteStep'
import { DeploymentInfoFormStep } from '@/routes/~_auth/~(index)/components/CreateApplicationFunnel/DeploymentInfoFormStep'
import { ResourcesFormStep } from '@/routes/~_auth/~(index)/components/CreateApplicationFunnel/ResourcesFormStep'
import { CreateApplicationFunnelSteps } from '@/routes/~_auth/~(index)/type'

export const NoApplicationLanding = () => {
  const openCreateApplicationFunnelDialog = useFunnelDialog<CreateApplicationFunnelSteps>({
    id: 'create-application',
    initial: {
      step: '어플리케이션_정보입력',
      context: { application: {} },
    },
  })

  const onClick = () => {
    openCreateApplicationFunnelDialog({
      closeableWithOutside: false,
      closeButton: true,
      render: ({ dialog: { closeAsTrue } }) => ({
        어플리케이션_정보입력: {
          title: '서비스 이름을 알려주세요',
          content: ({ history, context }) => {
            return (
              <ApplicationFormStep
                initialValue={context.application}
                onNext={(c) => {
                  history.replace('어플리케이션_정보입력', { application: c })
                  history.push('배포_정보입력', { application: c, deploy: {} })
                }}
              />
            )
          },
        },
        배포_정보입력: {
          title: '배포에 필요한 정보를 입력해주세요',
          content: ({ history, context }) => {
            return (
              <DeploymentInfoFormStep
                initialValue={context.deploy}
                onNext={(c) => {
                  history.replace('배포_정보입력', { deploy: c })
                  history.push('리소스_정보입력', { ...context, deploy: c, resource: {} })
                }}
                onPrevious={history.back}
              />
            )
          },
        },
        리소스_정보입력: {
          title: '서비스에 필요한 리소스를 선택해주세요',
          content: ({ history, context }) => {
            return (
              <ResourcesFormStep
                initialValue={context.resource}
                onNext={(c) => {
                  history.replace('리소스_정보입력', { resource: c })
                  history.push('배포요청_완료', { ...context, resource: c })
                }}
                onPrevious={history.back}
              />
            )
          },
        },
        배포요청_완료: {
          title: '',
          content: ({ context }) => {
            return <DeploymentCompleteStep close={closeAsTrue} context={context} />
          },
        },
      }),
    })
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
