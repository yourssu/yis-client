import { ApplicationFormStep } from '@/components/CreateDeploymentFunnelStep/ApplicationFormStep'
import { DeploymentCompleteStep } from '@/components/CreateDeploymentFunnelStep/DeploymentCompleteStep'
import { DeploymentInfoFormStep } from '@/components/CreateDeploymentFunnelStep/DeploymentInfoFormStep'
import { ResourcesFormStep } from '@/components/CreateDeploymentFunnelStep/ResourcesFormStep'
import { CreateDeploymentFunnelSteps } from '@/components/CreateDeploymentFunnelStep/type'
import { useFunnelDialog } from '@/hooks/useFunnelDialog'

export const useCreateApplicationFunnelDialog = () => {
  const openCreateApplicationFunnelDialog = useFunnelDialog<
    CreateDeploymentFunnelSteps<'withCreateApplication'>
  >({
    id: 'create-application',
    initial: {
      step: '어플리케이션_정보입력',
      context: { application: {} },
    },
  })

  return () => {
    return openCreateApplicationFunnelDialog({
      closeableWithOutside: false,
      closeButton: true,
      render: ({ dialog: { closeAsTrue } }) => ({
        어플리케이션_정보입력: {
          title: '서비스 이름을 알려주세요',
          content: ({ history, context }) => {
            return (
              <ApplicationFormStep
                close={closeAsTrue}
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
}
