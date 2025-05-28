import { z } from 'zod/v4'

import { api } from '@/apis/api'
import { applicationKey } from '@/apis/keys'
import {
  ApplicationClusterStatusResponseType,
  ApplicationClusterStatusSchema,
  ApplicationResponseType,
  ApplicationSchema,
} from '@/types/application'
import { DeploymentResponseType, DeploymentSchema } from '@/types/deployment'
import { PaginatedResponseType, PaginatedSchema, PaginationParams } from '@/types/pagination'
import { handleError } from '@/utils/error'
import { omitByNullish } from '@/utils/misc'
import { camelizeSchema, optionalizeSchema } from '@/utils/zod'
import { useQueryClient } from '@tanstack/react-query'

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
  return ApplicationSchema.parse(res)
}

export const getApplication = async (applicationId: number) => {
  const res = await api.get<ApplicationResponseType>(`applications/${applicationId}`).json()
  return ApplicationSchema.parse(res)
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
  return PaginatedSchema(DeploymentSchema).parse(res)
}

export const checkApplicationNameUnique = async (name: string) => {
  const res = await api
    .post<CheckApplicationNameUniqueResponseType>('applications/unique', {
      json: { name },
    })
    .json()
  return optionalizeSchema(camelizeSchema(CheckApplicationNameUniqueResponseSchema)).parse(res)
    .isUnique
}

export const getApplicationClusterStatus = async (applicationId: number) => {
  try {
    const res = await api
      .get<ApplicationClusterStatusResponseType>(`applications/${applicationId}/cluster/status`, {
        retry: 0,
      })
      .json()
    return ApplicationClusterStatusSchema.parse(res)
  } catch (e) {
    const { type, message } = await handleError(e)
    if (
      type === 'KyHTTPError' &&
      ['NoneType', 'metadata', 'get deployment status'].every((token) => message.includes(token))
    ) {
      return undefined
    }
    throw e
  }
}

export const getFullApplication = async (applicationId: number) => {
  const application = await getApplication(applicationId)

  const [deployments, clusterStatus] = await Promise.all([
    getApplicationDeployments({ applicationId, orderBy: 'UPDATED_AT_DESC' }),
    getApplicationClusterStatus(applicationId),
  ])

  return {
    ...application,
    recentDeployment: deployments.data[0],
    clusterStatus,
  }
}

export const useApplicationDeploymentsInvalidation = (applicationId: number) => {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({
      queryKey: applicationKey.deployments(applicationId),
    })
  }
}
