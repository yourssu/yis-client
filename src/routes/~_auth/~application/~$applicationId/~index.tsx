import { ApplicationDetailPageSearchParams } from '@/routes/~_auth/~application/~$applicationId/type'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/application/$applicationId/')({
  component: () => <></>,
  validateSearch: (search): ApplicationDetailPageSearchParams => {
    return {
      tab: (search.tab as ApplicationDetailPageSearchParams['tab']) ?? 'overview',
    }
  },
})
