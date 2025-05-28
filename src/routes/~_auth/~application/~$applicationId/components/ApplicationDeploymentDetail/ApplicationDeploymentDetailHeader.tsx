import clsx from 'clsx'
import { MdCheck, MdClose, MdSend } from 'react-icons/md'
import { tv } from 'tailwind-variants'

import { DeploymentStateKRNameMap, DeploymentStateNames, DeploymentType } from '@/types/deployment'

interface ApplicationDeploymentDetailHeaderProps {
  deployment: DeploymentType
}

const stateColor = tv({
  slots: {
    text: '',
    background: '',
  },
  variants: {
    state: {
      REQUEST: {
        text: 'text-orange500',
        background: 'bg-orange100',
      },
      APPROVAL: {
        text: 'text-green500',
        background: 'bg-green100',
      },
      RETURN: {
        text: 'text-red500',
        background: 'bg-red100',
      },
    },
  },
})

export const ApplicationDeploymentDetailHeader = ({
  deployment,
}: ApplicationDeploymentDetailHeaderProps) => {
  const { background, text } = stateColor()
  const Icon = DeploymentStateIcontMap[deployment.state]

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className={clsx('mb-0.5 text-xs font-medium', text({ state: deployment.state }))}>
          배포 {DeploymentStateKRNameMap[deployment.state]}
        </div>
        <div className="text-17 font-semibold">배포 정보</div>
      </div>
      <div
        className={clsx(
          'flex size-10 items-center justify-center rounded-[10px]',
          background({ state: deployment.state })
        )}
      >
        <Icon className={clsx('size-4', text({ state: deployment.state }))} />
      </div>
    </div>
  )
}

const DeploymentStateIcontMap = {
  REQUEST: MdSend,
  APPROVAL: MdCheck,
  RETURN: MdClose,
} as const satisfies Record<DeploymentStateNames, React.ComponentType>
