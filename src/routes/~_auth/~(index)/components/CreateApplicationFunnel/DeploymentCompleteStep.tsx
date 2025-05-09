import { useState } from 'react'
import { SwitchCase } from 'react-simplikit'

import { Dialog } from '@/components/Dialog'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useCreateFirstDeploymentMutation } from '@/routes/~_auth/~(index)/hooks/useCreateFirstDeploymentMutation'
import { CreateApplicationFunnelSteps } from '@/routes/~_auth/~(index)/type'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

interface DeploymentCompleteStepProps {
  close: () => void
  context: CreateApplicationFunnelSteps['배포요청_완료']
}

interface ResultProps {
  content: React.ReactNode
  description: string
  title: string
}

const Result = ({ content, description, title }: ResultProps) => {
  return (
    <div className="flex size-full flex-col items-center">
      <div className="flex h-[260px] w-full items-end justify-center">{content}</div>
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-neutralMuted mt-2 text-sm">{description}</div>
    </div>
  )
}

export const DeploymentCompleteStep = ({ context, close }: DeploymentCompleteStepProps) => {
  const [result, setResult] = useState<'error' | 'loading' | 'success'>('loading')
  const mutateResult = useCreateFirstDeploymentMutation()

  useEffectOnce(() => {
    const process = async () => {
      const success = await mutateResult({
        application: context.application,
        deployment: context.deploy,
        resource: context.resource,
      })
      setResult(success ? 'success' : 'error')
    }
    process()
  })

  return (
    <>
      <Dialog.Content className="h-[440px] w-[500px] !pt-0">
        <SwitchCase
          caseBy={{
            error: () => <div className="text-red-500">배포 요청에 실패했어요.</div>,
            loading: () => <Result {...ResultMap.loading} />,
            success: () => <Result {...ResultMap.success} />,
          }}
          value={result}
        />
      </Dialog.Content>
      {result === 'success' && (
        <Dialog.ButtonGroup>
          <Dialog.Button onClick={close} variant="primary">
            확인
          </Dialog.Button>
        </Dialog.ButtonGroup>
      )}
    </>
  )
}

const ResultMap = {
  success: {
    title: '배포 요청을 보냈어요',
    description: '승인까지 최대 하루 정도 걸릴 수 있어요.',
    content: <DotLottieReact autoplay className="w-[80%]" src="/lotties/success.lottie" />,
  },
  loading: {
    title: '배포 요청을 보내고 있어요',
    description: '몇 초 정도 기다리면 배포가 완료돼요.',
    content: (
      <DotLottieReact
        autoplay
        className="w-full"
        loop
        speed={1.1}
        src="/lotties/bouncy-loading.lottie"
      />
    ),
  },
}
