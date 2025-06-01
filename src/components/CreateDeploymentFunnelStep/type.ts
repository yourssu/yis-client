import { CpuResourceNames, MemoryResourceNames } from '@/types/resource'
import { If, Merge, MergeIf } from '@/utils/type'

export type ApplicationPlaceholder = {
  id: number
  name: string
}

export type ApplicationContext = {
  description?: string
  name?: string
}
export type ApplicationConfirmedContext = Required<ApplicationContext>

export type DeployContext = {
  domainName?: string
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

export type CreateDeploymentFunnelSteps<
  TFunnelType extends 'onlyCreateDeployment' | 'withCreateApplication',
  TApplicationType = TFunnelType extends 'onlyCreateDeployment'
    ? ApplicationPlaceholder
    : ApplicationConfirmedContext,
> = MergeIf<
  If<TFunnelType, 'withCreateApplication'>,
  {
    리소스_정보입력: {
      application: TApplicationType
      deploy: DeployConfirmedContext
      resource: ResourceContext
    }
    배포_정보입력: {
      application: TApplicationType
      deploy: DeployContext
    }
    배포요청_완료: {
      application: TApplicationType
      deploy: DeployConfirmedContext
      resource: ResourceConfirmedContext
    }
  },
  {
    어플리케이션_정보입력: {
      application: ApplicationContext
    }
  }
>
