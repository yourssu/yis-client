import { z } from 'zod'

import { api } from '@/apis/api'
import {
  ApplicationClusterStatusResponseSchema,
  ApplicationClusterStatusResponseType,
  ApplicationResponseSchema,
  ApplicationResponseType,
} from '@/types/application'
import { DeploymentResponseSchema, DeploymentResponseType } from '@/types/deployment'
import {
  PaginatedResponseSchema,
  PaginatedResponseType,
  PaginationParams,
} from '@/types/pagination'
import { omitByNullish } from '@/utils/misc'
import { camelizeSchema } from '@/utils/zod'

export type CreateApplicationProps = {
  description?: string
  name: string
}

type GetApplicationDeploymentsProps = PaginationParams & {
  applicationId: number
}

const CheckApplicationNameUniqueResponseSchema = z.object({
  is_unique: z.boolean(),
})

type CheckApplicationNameUniqueResponseType = z.infer<
  typeof CheckApplicationNameUniqueResponseSchema
>

export const createApplication = async (props: CreateApplicationProps) => {
  const res = await api.post<ApplicationResponseType>('applications/', { json: props }).json()
  return camelizeSchema(ApplicationResponseSchema).parse(res)
}

export const getApplication = async (applicationId: number) => {
  const res = await api.get<ApplicationResponseType>(`applications/${applicationId}`).json()
  return camelizeSchema(ApplicationResponseSchema).parse(res)
}

export const getApplicationDeployments = async ({
  applicationId,
  limit = 100,
  skip = 0,
  orderBy,
}: GetApplicationDeploymentsProps) => {
  const res = await api
    .get<PaginatedResponseType<DeploymentResponseType[]>>(
      `applications/${applicationId}/deployments`,
      {
        searchParams: omitByNullish({
          limit,
          skip,
          orderBy,
        }),
      }
    )
    .json()
  return camelizeSchema(PaginatedResponseSchema(DeploymentResponseSchema)).parse(res)
}

export const checkApplicationNameUnique = async (name: string) => {
  const res = await api
    .post<CheckApplicationNameUniqueResponseType>('applications/unique', {
      json: { name },
    })
    .json()
  return camelizeSchema(CheckApplicationNameUniqueResponseSchema).parse(res).isUnique
}

export const getApplicationClusterStatus = async (applicationId: number) => {
  const res = await api
    .get<ApplicationClusterStatusResponseType>(`applications/${applicationId}/cluster/status`)
    .json()
  return camelizeSchema(ApplicationClusterStatusResponseSchema).parse(res)
}
