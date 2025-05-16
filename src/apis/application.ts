import { api } from '@/apis/api'
import { ApplicationResponseSchema, ApplicationResponseType } from '@/types/application'
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
