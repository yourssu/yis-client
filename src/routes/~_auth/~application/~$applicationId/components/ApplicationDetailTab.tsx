import { invert } from 'es-toolkit'
import { Suspense } from 'react'
import { SwitchCase } from 'react-simplikit'

import { ChipTab } from '@/components/ChipTab'
import { useSearchState } from '@/hooks/useSearchState'
import { ApplicationDetailDeployments } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDetailDeployments'
import { ApplicationDetailOverview } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDetailOverview'
import { ApplicationDetailPageSearchParams } from '@/routes/~_auth/~application/~$applicationId/type'
import { FullApplicationType } from '@/types/application'

interface ApplicationDetailTabProps {
  application: FullApplicationType
}

export const ApplicationDetailTab = ({ application }: ApplicationDetailTabProps) => {
  const [search, setSearch] = useSearchState({
    from: '/_auth/application/$applicationId/',
  })

  return (
    <ChipTab
      defaultTab={tabStateNameMap[search.tab]}
      onTabChange={(v) => {
        setSearch(() => ({ tab: invert(tabStateNameMap)[v] }))
      }}
      tabs={Object.values(tabStateNameMap)}
    >
      {({ tab }) => (
        <div className="pt-3.5">
          <SwitchCase
            caseBy={{
              개요: () => <ApplicationDetailOverview application={application} />,
              '배포 목록': () => (
                <Suspense>
                  <ApplicationDetailDeployments application={application} />
                </Suspense>
              ),
              클러스터: () => <div />,
            }}
            value={tab}
          />
        </div>
      )}
    </ChipTab>
  )
}

const tabStateNameMap = {
  overview: '개요',
  deployments: '배포 목록',
  cluster: '클러스터',
} as const satisfies Record<ApplicationDetailPageSearchParams['tab'], string>
