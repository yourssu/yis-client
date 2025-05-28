import { DeploymentStateNames } from '@/types/deployment'

export type AdminPageSearchParams = {
  id?: string
  tab: DeploymentStateNames
}
