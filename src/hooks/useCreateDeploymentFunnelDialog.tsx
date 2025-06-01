import { DeploymentCompleteStep } from '@/components/CreateDeploymentFunnelStep/DeploymentCompleteStep'
import { DeploymentInfoFormStep } from '@/components/CreateDeploymentFunnelStep/DeploymentInfoFormStep'
import { ApplicationPlaceholder } from '@/components/CreateDeploymentFunnelStep/hooks/useCreateDeploymentMutation'
import { ResourcesFormStep } from '@/components/CreateDeploymentFunnelStep/ResourcesFormStep'
import { CreateDeploymentFunnelSteps } from '@/components/CreateDeploymentFunnelStep/type'
import { useFunnelDialog } from '@/hooks/useFunnelDialog'

interface UseCreateDeploymentFunnelDialogProps {
  application: ApplicationPlaceholder
}

export const useCreateDeploymentFunnelDialog = ({
  application,
}: UseCreateDeploymentFunnelDialogProps) => {
  const openCreateDeploymentFunnelDialog = useFunnelDialog<
    CreateDeploymentFunnelSteps<'onlyCreateDeployment'>
  >({
    id: 'create-deployment',
    initial: {
      step: '배포_정보입력',
      context: {
        application,
        deploy: {},
      },
    },
  })

  return () => {
    return openCreateDeploymentFunnelDialog({
      closeableWithOutside: false,
      closeButton: true,
      render: ({ dialog: { closeAsTrue } }) => ({
        배포_정보입력: {
          title: '배포에 필요한 정보를 입력해주세요',
          content: ({ history, context }) => {
            return (
              <DeploymentInfoFormStep
                application={context.application}
                close={closeAsTrue}
                initialValue={context.deploy}
                onNext={(c) => {
                  history.replace('배포_정보입력', { deploy: c })
                  history.push('리소스_정보입력', { ...context, deploy: c, resource: {} })
                }}
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
