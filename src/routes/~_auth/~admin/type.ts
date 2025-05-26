import { DeploymentStateNames } from '@/types/deployment'

export type AdminPageSearchParams = {
  id?: string
  tab: DeploymentStateNames
}

export const DeploymentStateKRNameMap = {
  REQUEST: '요청',
  APPROVAL: '승인',
  RETURN: '거절',
} as const
