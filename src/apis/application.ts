import { z } from 'zod'

import { api } from '@/apis/api'
import { ApplicationResponseSchema, ApplicationResponseType } from '@/types/application'
import { DeploymentResponseSchema, DeploymentResponseType } from '@/types/deployment'
import { PaginationParams } from '@/utils/ky'
import { camelizeSchema } from '@/utils/zod'

export type CreateApplicationProps = {
  description?: string
  name: string
}

type GetApplicationDeploymentsProps = PaginationParams & {
  applicationId: number
}

export const createApplication = async (props: CreateApplicationProps) => {
  const res = await api.post<ApplicationResponseType>('applications/', { json: props }).json()
  return camelizeSchema(ApplicationResponseSchema).parse(res)
}

export const getApplicationDeployments = async ({
  applicationId,
  limit = 100,
  skip = 0,
}: GetApplicationDeploymentsProps) => {
  const res = await api
    .get<DeploymentResponseType[]>(`applications/${applicationId}/deployments`, {
      searchParams: {
        limit,
        skip,
      },
    })
    .json()
  return camelizeSchema(z.array(DeploymentResponseSchema)).parse(res)
}
