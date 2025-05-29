import { match, P } from 'ts-pattern'

import { createApplication, CreateApplicationProps } from '@/apis/application'
import { createDeployment, CreateDeploymentProps } from '@/apis/deployment'
import { Merge, Prettify } from '@/utils/type'
import { useMutation } from '@tanstack/react-query'

export type ApplicationPlaceholder = {
  id: number
  name: string
}

type CreateDeploymentMutationPayload = Prettify<
  | Merge<CreateDeploymentProps, { application: ApplicationPlaceholder }>
  | Merge<CreateDeploymentProps, { application: CreateApplicationProps }>
>

export const useCreateDeploymentMutation = () => {
  const { mutateAsync: createApplicationMutation } = useMutation({
    mutationFn: createApplication,
  })
  const { mutateAsync: createDeploymentMutation } = useMutation({
    mutationFn: createDeployment,
  })

  const mutate = async (payload: CreateDeploymentMutationPayload) => {
    try {
      const { id, name } = await match(payload.application)
        .with({ id: P.number }, (application) => application)
        .otherwise((application) => createApplicationMutation(application))

      const createDeploymentResult = await createDeploymentMutation({
        deployment: payload.deployment,
        resource: payload.resource,
        application: {
          id,
          name,
        },
      })
      return createDeploymentResult
    } catch {
      return false
    }
  }

  return mutate
}
