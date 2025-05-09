import { api } from '@/apis/api'
import { DeploymentResponseSchema, DeploymentResponseType } from '@/types/deployment'
import { CpuResourceNames, CpuResourceValueMap, MemoryResourceNames } from '@/types/resource'
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
