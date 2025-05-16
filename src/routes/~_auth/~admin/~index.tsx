import { DeploymentStateNames } from '@/types/deployment'
import { createFileRoute } from '@tanstack/react-router'

type SearchParams = Partial<{
  id: string
  tab: DeploymentStateNames
}>

export const Route = createFileRoute('/_auth/admin/')({
  component: () => <></>,
  validateSearch: (search): SearchParams => {
    return {
      tab: (search.tab as DeploymentStateNames) || 'APPROVAL',
      id: (search.id as string) || undefined,
    }
  },
})
