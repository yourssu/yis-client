import { DeploymentStateNames } from '@/types/deployment'

export type AdminRequestsPageSearchParams = {
  id?: string
  tab: DeploymentStateNames
}
