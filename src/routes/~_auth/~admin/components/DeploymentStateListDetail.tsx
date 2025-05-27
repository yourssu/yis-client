import { Suspense } from 'react'

import { Divider } from '@/components/Divider'
import { DeploymentStateListDetailConversation } from '@/routes/~_auth/~admin/components/DeploymentStateListDetailConversation'
import { DeploymentStateListDetailFooter } from '@/routes/~_auth/~admin/components/DeploymentStateListDetailFooter'
import { DeploymentStateListDetailHeader } from '@/routes/~_auth/~admin/components/DeploymentStateListDetailHeader'
import { DeploymentStateListDetailInformation } from '@/routes/~_auth/~admin/components/DeploymentStateListDetailInformation'
import { ApplicationType } from '@/types/application'
import { DeploymentStateNames, DeploymentType } from '@/types/deployment'

interface DeploymentStateListDetailProps {
  application: ApplicationType
  deployment: DeploymentType
  state: DeploymentStateNames
}

export const DeploymentStateListDetail = ({
  deployment,
  application,
  state,
}: DeploymentStateListDetailProps) => {
  return (
    <div className="flex flex-col gap-5">
      <DeploymentStateListDetailHeader application={application} />
      <DeploymentStateListDetailInformation deployment={deployment} state={state} />
      <Divider />
      <Suspense>
        <DeploymentStateListDetailConversation
          application={application}
          deployment={deployment}
          state={state}
        />
      </Suspense>
      {state === 'REQUEST' && (
        <DeploymentStateListDetailFooter deploymentId={deployment.id} state={state} />
      )}
    </div>
  )
}
