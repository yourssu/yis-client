import { z } from 'zod/v4'

import { api } from '@/apis/api'
import { applicationKey } from '@/apis/keys'
import {
  ApplicationClusterStatusResponseType,
  ApplicationClusterStatusSchema,
  ApplicationResponseSchema,
  ApplicationResponseType,
  ApplicationSchema,
} from '@/types/application'
import { DeploymentResponseType, DeploymentSchema } from '@/types/deployment'
import {
  PaginatedResponseSchema,
  PaginatedResponseType,
  PaginatedSchema,
  PaginationParams,
} from '@/types/pagination'
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

const AllApplicationStateCountResponseSchema = z.object({
  state_count: z.object({
    request_count: z.number(),
    check_count: z.number(),
    return_count: z.number(),
    approval_count: z.number(),
  }),
})

type AllApplicationStateCountResponseType = z.infer<typeof AllApplicationStateCountResponseSchema>

const PaginatedAllApplicationsSchema = camelizeSchema(
  z.object({
    ...AllApplicationStateCountResponseSchema.shape,
    ...PaginatedResponseSchema(ApplicationResponseSchema).shape,
  })
)

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
  const [application, deployments, clusterStatus] = await Promise.all([
    getApplication(applicationId),
    getApplicationDeployments({ applicationId, orderBy: 'UPDATED_AT_DESC' }),
    getApplicationClusterStatus(applicationId),
  ])

  return {
    ...application,
    recentDeployment: deployments.data[0],
    clusterStatus,
  }
}

export const deleteApplication = async (applicationId: number) => {
  const res = await api.delete(`applications/${applicationId}`).json()
  return ApplicationSchema.parse(res)
}

export const useApplicationDeploymentsInvalidation = (applicationId: number) => {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({
      queryKey: applicationKey.deployments(applicationId),
    })
  }
}

export const getAllApplications = async ({ limit = 100, skip = 0, orderBy }: PaginationParams) => {
  const res = await api
    .get<AllApplicationStateCountResponseType & PaginatedResponseType<ApplicationResponseType[]>>(
      `applications/`,
      {
        searchParams: omitByNullish({
          limit,
          skip,
          orderBy,
        }),
      }
    )
    .json()
  return PaginatedAllApplicationsSchema.parse(res)
}
