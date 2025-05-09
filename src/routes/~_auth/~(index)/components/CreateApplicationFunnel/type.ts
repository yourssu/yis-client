import { CpuResourceNames, MemoryResourceNames } from '@/types/resource'

export type CreateApplicationFunnelSteps = {
  리소스_정보입력: {
    application: {
      description: string
      name: string
    }
    deploy: {
      domain: string
      imageUrl: string
      message?: string
      port: number
    }
    resource: {
      cpuLimit?: CpuResourceNames
      cpuRequest?: CpuResourceNames
      memoryLimit?: MemoryResourceNames
      memoryRequest?: MemoryResourceNames
    }
  }
  배포_정보입력: {
    application: {
      description: string
      name: string
    }
    deploy: {
      domain?: string
      imageUrl?: string
      message?: string
      port?: number
    }
  }
  어플리케이션_정보입력: {
    application: {
      description?: string
      name?: string
    }
  }
}
