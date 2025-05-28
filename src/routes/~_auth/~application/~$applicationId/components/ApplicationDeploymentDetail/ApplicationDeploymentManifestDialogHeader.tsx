import { MdClose } from 'react-icons/md'

import { DeploymentManifestType } from '@/types/deployment'

interface ApplicationDeploymentManifestDialogHeaderProps {
  close: () => void
  selectedManifest: DeploymentManifestType | undefined
}

export const ApplicationDeploymentManifestDialogHeader = ({
  close,
  selectedManifest,
}: ApplicationDeploymentManifestDialogHeaderProps) => {
  return (
    <div className="flex items-center pt-5 pr-3.5 pl-5">
      <div className="flex grow items-center self-stretch font-semibold">
        {selectedManifest?.fileName}
      </div>
      <div className="shrink-0">
        <button
          className="hover:bg-greyOpacity100 ease-ease inline-flex size-8 cursor-pointer items-center justify-center rounded-md transition-colors duration-200"
          onClick={close}
        >
          <MdClose className="text-neutralSubtle size-5" />
        </button>
      </div>
    </div>
  )
}
