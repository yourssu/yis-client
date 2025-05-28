import { Dispatch, SetStateAction } from 'react'
import { tv } from 'tailwind-variants'

import { DeploymentManifestType } from '@/types/deployment'

interface ApplicationDeploymentManifestDialogSidebarProps {
  manifests: DeploymentManifestType[]
  selectedManifest: DeploymentManifestType | undefined
  setSelectedManifest: Dispatch<SetStateAction<DeploymentManifestType | undefined>>
}

const button = tv({
  base: 'hover:bg-greyOpacity100 text-13 w-full cursor-pointer rounded-lg px-3 py-2 text-left transition-colors duration-200',
  variants: {
    selected: {
      true: 'bg-greyOpacity100 !text-neutral',
      false: '!text-neutralMuted',
    },
  },
})

export const ApplicationDeploymentManifestDialogSidebar = ({
  manifests,
  selectedManifest,
  setSelectedManifest,
}: ApplicationDeploymentManifestDialogSidebarProps) => {
  return (
    <div className="w-full">
      <div className="text-13 text-neutralSubtle mb-2 font-medium">파일 목록</div>
      <div className="flex flex-col gap-1">
        {manifests.map((manifest) => (
          <button
            className={button({ selected: selectedManifest?.fileName === manifest.fileName })}
            key={manifest.fileName}
            onClick={() => setSelectedManifest(manifest)}
          >
            {manifest.fileName}
          </button>
        ))}
      </div>
    </div>
  )
}
