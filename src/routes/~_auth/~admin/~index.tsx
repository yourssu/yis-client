import { AdminPageSearchParams } from '@/routes/~_auth/~admin/type'
import { DeploymentStateNames } from '@/types/deployment'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/admin/')({
  component: () => <></>,
  validateSearch: (search): AdminPageSearchParams => {
    return {
      tab: (search.tab as DeploymentStateNames) || 'APPROVAL',
      id: (search.id as string) || undefined,
    }
  },
})
