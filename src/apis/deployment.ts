import { api } from '@/apis/api'
import { getApplication } from '@/apis/application'
import {
  DeploymentResponseSchema,
  DeploymentResponseType,
  DeploymentStateNames,
} from '@/types/deployment'
import {
  PaginatedResponseSchema,
  PaginatedResponseType,
  PaginationParams,
} from '@/types/pagination'
import { CpuResourceNames, CpuResourceValueMap, MemoryResourceNames } from '@/types/resource'
import { omitByNullish } from '@/utils/misc'
import { camelizeSchema } from '@/utils/zod'

export type CreateDeploymentProps = {
  application: {
    id: number
  }
  deployment: {
    domain: string
    imageUrl: string
    message?: string
    port: number
  }
  resource: {
    cpuLimit: CpuResourceNames
    cpuRequest: CpuResourceNames
    memoryLimit: MemoryResourceNames
    memoryRequest: MemoryResourceNames
  }
}

type GetDeploymentsByStateProps = PaginationParams & {
  state: DeploymentStateNames
}

export const createDeployment = async (props: CreateDeploymentProps) => {
  const res = await api
    .post<DeploymentResponseType>('deployments/', {
      json: {
        link: 'https://www.google.com', // Todo: 아직 승인 링크 안만들어짐
        deployment: {
          domain_name: props.deployment.domain,
          cpu_requests: CpuResourceValueMap[props.resource.cpuRequest],
          memory_requests: props.resource.memoryRequest,
          cpu_limits: CpuResourceValueMap[props.resource.cpuLimit],
          memory_limits: props.resource.memoryLimit,
          port: props.deployment.port,
          image_url: props.deployment.imageUrl,
          replicas: 1,
          message: props.deployment.message,
          application_id: props.application.id,
        },
        manifests: [],
      },
    })
    .json()
  return camelizeSchema(DeploymentResponseSchema).parse(res)
}

export const getDeploymentsByState = async ({
  state,
  limit = 50,
  skip = 0,
  orderBy,
}: GetDeploymentsByStateProps) => {
  const res = await api
    .get<PaginatedResponseType<DeploymentResponseType[]>>(`deployments/state`, {
      searchParams: omitByNullish({
        limit,
        skip,
        state,
        order_by: orderBy,
      }),
    })
    .json()
  return camelizeSchema(PaginatedResponseSchema(DeploymentResponseSchema)).parse(res)
}

export const getDeploymentsByStateWithApplication = async ({
  state,
  limit = 50,
  skip = 0,
  orderBy,
}: GetDeploymentsByStateProps) => {
  const res = await getDeploymentsByState({
    state,
    limit,
    skip,
    orderBy,
  })
  const applications = await Promise.all(
    res.data.map(async ({ applicationId }) => {
      const application = await getApplication(applicationId)
      return application
    })
  )

  return {
    ...res,
    data: res.data.map((deployment, index) => ({
      ...deployment,
      application: applications[index],
    })),
  }
}
