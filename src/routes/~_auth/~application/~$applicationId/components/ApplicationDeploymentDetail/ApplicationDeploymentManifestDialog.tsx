import { useState } from 'react'

import { Dialog } from '@/components/Dialog'
import { VerticalDivider } from '@/components/VerticalDivider'
import { ApplicationDeploymentManifestDialogContent } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDeploymentDetail/ApplicationDeploymentManifestDialogContent'
import { ApplicationDeploymentManifestDialogHeader } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDeploymentDetail/ApplicationDeploymentManifestDialogHeader'
import { ApplicationDeploymentManifestDialogSidebar } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDeploymentDetail/ApplicationDeploymentManifestDialogSidebar'
import { DeploymentManifestType } from '@/types/deployment'

interface ApplicationDeploymentManifestDialogProps {
  close: () => void
  isOpen: boolean
  manifests: DeploymentManifestType[]
}

export const ApplicationDeploymentManifestDialog = ({
  close,
  isOpen,
  manifests,
}: ApplicationDeploymentManifestDialogProps) => {
  const [selectedManifest, setSelectedManifest] = useState<DeploymentManifestType | undefined>(
    undefined
  )

  return (
    <Dialog closeableWithOutside onClose={close} open={isOpen}>
      <Dialog.Content className="h-[620px] w-[920px] max-w-full !p-0">
        <div className="flex size-full">
          <div className="h-full flex-[40_1] px-5 pt-7">
            <ApplicationDeploymentManifestDialogSidebar
              manifests={manifests}
              selectedManifest={selectedManifest}
              setSelectedManifest={setSelectedManifest}
            />
          </div>
          <VerticalDivider />
          <div className="flex flex-[75_1_0] flex-col overflow-y-auto">
            <ApplicationDeploymentManifestDialogHeader
              close={close}
              selectedManifest={selectedManifest}
            />
            {selectedManifest && (
              <ApplicationDeploymentManifestDialogContent manifest={selectedManifest} />
            )}
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}
