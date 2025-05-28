import { api } from '@/apis/api'
import { getApplication } from '@/apis/application'
import { deploymentKey } from '@/apis/keys'
import {
  DeploymentManifestType,
  DeploymentResponseType,
  DeploymentSchema,
  DeploymentStateNames,
} from '@/types/deployment'
import { PaginatedResponseType, PaginatedSchema, PaginationParams } from '@/types/pagination'
import {
  CpuResourceNames,
  CpuResourceValueMap,
  CpuResourceValueNames,
  MemoryResourceNames,
} from '@/types/resource'
import { makeManifests } from '@/utils/manifest'
import { omitByNullish } from '@/utils/misc'
import { useQueryClient } from '@tanstack/react-query'

export type CreateDeploymentProps = {
  application: {
    id: number
    name: string
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

interface UpdateDeploymentStateProps {
  comment?: string
  id: number
  link: string
  state: DeploymentStateNames
}

interface UpdateDeploymentAsRequestProps {
  deployment: {
    cpuLimits: CpuResourceValueNames
    cpuRequests: CpuResourceValueNames
    domainName: string
    imageUrl: string
    memoryLimits: MemoryResourceNames
    memoryRequests: MemoryResourceNames
    message?: string
    port: number
  }
  deploymentId: number
  manifests: DeploymentManifestType[] | undefined
}

export const createDeployment = async (props: CreateDeploymentProps) => {
  const res = await api
    .post<DeploymentResponseType>('deployments/', {
      json: {
        link: `${import.meta.env.VITE_APP_PROD_URL}/admin?tab=REQUEST&id={id}`, // 백엔드에서 {id}에 실제 deployment ID로 치환시켜요.
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
        manifests: makeManifests({
          applicationName: props.application.name,
          domainName: props.deployment.domain,
          port: props.deployment.port,
          imageUrl: props.deployment.imageUrl,
          cpuLimits: CpuResourceValueMap[props.resource.cpuLimit],
          cpuRequests: CpuResourceValueMap[props.resource.cpuRequest],
          memoryLimits: props.resource.memoryLimit,
          memoryRequests: props.resource.memoryRequest,
        }),
      },
    })
    .json()
  return DeploymentSchema.parse(res)
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
  return PaginatedSchema(DeploymentSchema).parse(res)
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

export const updateDeploymentState = async ({
  comment,
  link,
  state,
  id,
}: UpdateDeploymentStateProps) => {
  const res = await api
    .patch<DeploymentResponseType>(`deployments/${id}`, {
      json: {
        state,
        comment,
        link,
      },
    })
    .json()
  return DeploymentSchema.parse(res)
}

export const updateDeploymentAsRequest = async ({
  deploymentId,
  deployment,
  manifests,
}: UpdateDeploymentAsRequestProps) => {
  const res = await api
    .put<DeploymentResponseType>(`deployments/${deploymentId}`, {
      json: {
        deployment: {
          domain_name: deployment.domainName,
          cpu_requests: deployment.cpuRequests,
          memory_requests: deployment.memoryRequests,
          cpu_limits: deployment.cpuLimits,
          memory_limits: deployment.memoryLimits,
          port: deployment.port,
          image_url: deployment.imageUrl,
          replicas: 1,
          message: deployment.message,
        },
        manifests: manifests?.map((v) => ({
          file_name: v.fileName,
          content: v.content,
        })),
        is_request: true,
      },
    })
    .json()
  return DeploymentSchema.parse(res)
}

export const useDeploymentsByStateInvalidation = ({ state }: { state: DeploymentStateNames }) => {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({
      queryKey: deploymentKey.state(state),
    })
  }
}
