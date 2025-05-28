import { Merge } from 'type-fest'

import { CpuResourceNames, MemoryResourceNames } from '@/types/resource'

export type ApplicationContext = {
  description?: string
  name?: string
}
export type ApplicationConfirmedContext = Required<ApplicationContext>

export type DeployContext = {
  domain?: string
  imageUrl?: string
  message?: string
  port?: number
}
export type DeployConfirmedContext = Merge<Required<DeployContext>, Pick<DeployContext, 'message'>>

export type ResourceContext = {
  cpuLimits?: CpuResourceNames
  cpuRequests?: CpuResourceNames
  memoryLimits?: MemoryResourceNames
  memoryRequests?: MemoryResourceNames
}
export type ResourceConfirmedContext = Required<ResourceContext>

export type CreateApplicationFunnelSteps = {
  리소스_정보입력: {
    application: ApplicationConfirmedContext
    deploy: DeployConfirmedContext
    resource: ResourceContext
  }
  배포_정보입력: {
    application: ApplicationConfirmedContext
    deploy: DeployContext
  }
  배포요청_완료: {
    application: ApplicationConfirmedContext
    deploy: DeployConfirmedContext
    resource: ResourceConfirmedContext
  }
  어플리케이션_정보입력: {
    application: ApplicationContext
  }
}
