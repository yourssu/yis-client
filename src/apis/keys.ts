import { DeploymentStateNames } from '@/types/deployment'

export const applicationKey = {
  all: ['application'] as const,
  detail: (applicationId: number) => [...applicationKey.all, { applicationId }] as const,
}

export const userKey = {
  all: ['user'] as const,
  me: () => [...userKey.all, 'me'] as const,
  applications: (userId: number) => [...userKey.all, 'applications', { userId }] as const,
}

export const deploymentKey = {
  all: ['deployment'] as const,
  state: (state: DeploymentStateNames) => [...deploymentKey.all, 'state', { state }] as const,
}
