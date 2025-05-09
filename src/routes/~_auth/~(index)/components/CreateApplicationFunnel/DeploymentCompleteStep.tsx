import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { SwitchCase } from 'react-simplikit'

import { Dialog } from '@/components/Dialog'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useCreateFirstDeploymentMutation } from '@/routes/~_auth/~(index)/hooks/useCreateFirstDeploymentMutation'
import { CreateApplicationFunnelSteps } from '@/routes/~_auth/~(index)/type'
import { DotLottie, DotLottieReact, DotLottieReactProps } from '@lottiefiles/dotlottie-react'
interface DeploymentCompleteStepProps {
  close: () => void
  context: CreateApplicationFunnelSteps['배포요청_완료']
}

interface ResultProps {
  description: string
  lottieProps: DotLottieReactProps
  title: string
}

type ResultType = 'error' | 'loading' | 'success'

const Result = ({ lottieProps, description, title }: ResultProps) => {
  const [dotLottie, setDotLottie] = useState<DotLottie | undefined>(undefined)

  /* 
    src가 변경되더라도 이전 로띠의 프레임을 유지하는 문제가 있어요.
    로띠가 로드되면 프레임을 다시 1로 설정해줌으로 해결해줘요. (0 안됨)
  */
  useEffect(() => {
    if (!dotLottie) {
      return
    }
    const onLoad = () => {
      dotLottie.setFrame(1)
    }
    dotLottie.addEventListener('load', onLoad)
    return () => {
      dotLottie.removeEventListener('load', onLoad)
    }
  }, [lottieProps.src])

  return (
    <div className="flex size-full flex-col items-center">
      <div className="flex h-[260px] w-full items-end justify-center">
        <DotLottieReact
          autoplay
          dotLottieRefCallback={(v) => setDotLottie(v ?? undefined)}
          {...lottieProps}
        />
      </div>
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-neutralMuted mt-2 text-sm">{description}</div>
    </div>
  )
}

export const DeploymentCompleteStep = ({ context, close }: DeploymentCompleteStepProps) => {
  const [result, setResult] = useState<ResultType>('loading')
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
            success: () => <Result {...ResultMap.success} />,
            loading: () => <Result {...ResultMap.loading} />,
            error: () => <Result {...ResultMap.error} />,
          }}
          value={result}
        />
      </Dialog.Content>
      <Dialog.ButtonGroup>
        <Dialog.Button
          className={clsx(result === 'loading' && 'invisible')}
          onClick={close}
          variant="primary"
        >
          확인
        </Dialog.Button>
      </Dialog.ButtonGroup>
    </>
  )
}

const ResultMap: Record<
  ResultType,
  { description: string; lottieProps: DotLottieReactProps; title: string }
> = {
  success: {
    title: '배포 요청을 보냈어요',
    description: '승인까지 최대 하루 정도 걸릴 수 있어요.',
    lottieProps: {
      src: '/lotties/success.lottie',
      className: 'w-[80%]',
    },
  },
  loading: {
    title: '배포 요청을 보내고 있어요',
    description: '몇 초 정도 기다리면 배포가 완료돼요.',
    lottieProps: {
      src: '/lotties/bouncy-loading.lottie',
      loop: true,
      speed: 1.1,
      className: 'w-full',
    },
  },
  error: {
    title: '배포 요청에 실패했어요',
    description: '잠시 후 다시 시도해주세요.',
    lottieProps: {
      src: '/lotties/error.lottie',
      className: 'w-[60%] pb-4',
    },
  },
}
