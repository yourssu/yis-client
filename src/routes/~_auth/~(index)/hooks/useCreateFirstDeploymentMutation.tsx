import { createApplication, CreateApplicationProps } from '@/apis/application'
import { createDeployment, CreateDeploymentProps } from '@/apis/deployment'
import { Merge, Prettify } from '@/utils/type'
import { useMutation } from '@tanstack/react-query'

type CreateFirstDeploymentMutationPayload = Prettify<
  Merge<CreateDeploymentProps, { application: CreateApplicationProps }>
>

export const useCreateFirstDeploymentMutation = () => {
  const { mutateAsync: createApplicationMutation } = useMutation({
    mutationFn: createApplication,
  })
  const { mutateAsync: createDeploymentMutation } = useMutation({
    mutationFn: createDeployment,
  })

  const mutate = async (payload: CreateFirstDeploymentMutationPayload) => {
    const { application, deployment, resource } = payload

    try {
      const createApplicationResult = await createApplicationMutation(application)
      const createDeploymentResult = await createDeploymentMutation({
        deployment,
        resource,
        application: {
          id: createApplicationResult.id,
          name: createApplicationResult.name,
        },
      })
      return createDeploymentResult
    } catch {
      return false
    }
  }

  return mutate
}
