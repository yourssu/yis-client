import { invert } from 'es-toolkit'
import { Dispatch, SetStateAction, Suspense } from 'react'
import { SwitchCase } from 'react-simplikit'

import { ChipTab } from '@/components/ChipTab'
import { ApplicationDetailDeployments } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDetailDeployments'
import { ApplicationDetailOverview } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDetailOverview'
import { ApplicationDetailPageSearchParams } from '@/routes/~_auth/~application/~$applicationId/type'
import { FullApplicationType } from '@/types/application'

interface ApplicationDetailTabProps {
  application: FullApplicationType
  setTab: Dispatch<SetStateAction<ApplicationDetailPageSearchParams['tab']>>
  tab: ApplicationDetailPageSearchParams['tab']
}

export const ApplicationDetailTab = ({ application, tab, setTab }: ApplicationDetailTabProps) => {
  return (
    <ChipTab
      onTabChange={(v) => {
        setTab(() => invert(tabStateNameMap)[v])
      }}
      tab={tabStateNameMap[tab]}
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
