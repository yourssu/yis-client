import { useState } from 'react'
import { useInputState } from 'react-simplikit'
import { Merge } from 'type-fest'
import { z } from 'zod'

import { Dialog } from '@/components/Dialog'
import { NumberInput } from '@/components/TextInput/NumberInput'
import { TextInput } from '@/components/TextInput/TextInput'
import { CreateApplicationFunnelSteps } from '@/routes/~_auth/~(index)/components/CreateApplicationFunnel/type'

type CurrentStepContext = CreateApplicationFunnelSteps['배포_정보입력']['deploy']
type NextStepContext = Merge<Required<CurrentStepContext>, Pick<CurrentStepContext, 'message'>>

interface DeploymentInfoFormProps {
  initialValue?: CurrentStepContext
  onNext: (c: NextStepContext) => void
  onPrevious: () => void
}

export const DeploymentInfoFormStep = ({
  initialValue,
  onNext,
  onPrevious,
}: DeploymentInfoFormProps) => {
  const [domain, setDomain] = useInputState(initialValue?.domain ?? '')
  const [imageUrl, setImageUrl] = useInputState(initialValue?.imageUrl ?? '')
  const [port, setPort] = useState<number | undefined>(initialValue?.port)
  const [message, setMessage] = useInputState(initialValue?.message ?? '')

  const { error } = DeploymentInfoFormSchema.safeParse({
    domain,
    imageUrl,
    port,
    message,
  })

  return (
    <>
      <Dialog.Content className="h-[400px] w-[500px]">
        <div className="flex flex-col gap-4 pb-8">
          <TextInput
            description="ex) https://www.google.com"
            onChange={setDomain}
            placeholder="도메인"
            value={domain}
          />
          <NumberInput onChange={setPort} placeholder="포트 번호" value={port} />
          <TextInput onChange={setImageUrl} placeholder="도커 이미지 링크" value={imageUrl} />
          <TextInput
            description="관리자가 추가로 알아야 할 사항이 있다면 적어주세요."
            onChange={setMessage}
            placeholder="남길 메시지 (선택)"
            value={message}
          />
        </div>
      </Dialog.Content>
      <Dialog.ButtonGroup>
        <Dialog.Button
          onClick={() => {
            onPrevious()
          }}
          variant="subPrimary"
        >
          이전
        </Dialog.Button>
        <Dialog.Button
          disabled={!!error}
          onClick={() => {
            onNext({ domain, imageUrl, port: port ?? 0, message })
          }}
          variant="primary"
        >
          다음
        </Dialog.Button>
      </Dialog.ButtonGroup>
    </>
  )
}

const DeploymentInfoFormSchema = z.object({
  domain: z.string().url(),
  port: z.number().min(0).max(65535),
  imageUrl: z.string().url(),
  message: z.string().optional(),
})
