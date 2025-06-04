import { AdminPageSearchParams } from '@/routes/~_auth/~admin/~requests/type'
import { DeploymentStateNames } from '@/types/deployment'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/admin/requests/')({
  component: () => <></>,
  validateSearch: (search): AdminPageSearchParams => {
    return {
      tab: (search.tab as DeploymentStateNames) || 'APPROVAL',
      id: (search.id as string) || undefined,
    }
  },
})
