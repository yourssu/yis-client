import { useState } from 'react'
import { useInputState } from 'react-simplikit'

import { Dialog } from '@/components/Dialog'
import { NumberInput } from '@/components/TextInput/NumberInput'
import { TextInput } from '@/components/TextInput/TextInput'
import { useZodFormValidation } from '@/hooks/useZodFormValidation'
import { DeployConfirmedContext, DeployContext } from '@/routes/~_auth/~(index)/type'
import { DeploymentInfoFormSchema } from '@/types/deployment'
import { assertNonNullish } from '@/utils/assertion'

interface DeploymentInfoFormProps {
  initialValue?: DeployContext
  onNext: (c: DeployConfirmedContext) => void
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

  const formData = {
    domain,
    imageUrl,
    port,
    message,
  }

  const { invalid, invalidText, onChangeWithReset, validate } = useZodFormValidation(
    formData,
    DeploymentInfoFormSchema.form()
  )

  const { error: buttonError } = DeploymentInfoFormSchema.base.safeParse(formData)

  const onClickNext = () => {
    if (!validate()) {
      return
    }

    assertNonNullish(port)
    onNext({ domain, imageUrl, port, message })
  }

  return (
    <>
      <Dialog.Content className="h-[440px] w-[500px]">
        <div className="flex flex-col gap-4 pb-8">
          <TextInput
            description="http, https 없이 입력해주세요."
            invalid={invalid.domain}
            onChange={onChangeWithReset(setDomain)}
            placeholder="도메인 (예: www.example.com)"
            value={domain}
          />
          <NumberInput
            invalid={invalid.port}
            onChange={onChangeWithReset(setPort)}
            placeholder="포트 번호"
            value={port}
          />
          <TextInput
            description="ex) alexwhen/docker-2048:latest2"
            invalid={invalid.imageUrl}
            onChange={onChangeWithReset(setImageUrl)}
            placeholder="도커 이미지 링크"
            value={imageUrl}
          />
          <TextInput
            description="관리자가 추가로 알아야 할 사항이 있다면 적어주세요."
            invalid={invalid.message}
            onChange={onChangeWithReset(setMessage)}
            placeholder="남길 메시지 (선택)"
            value={message}
          />
          {invalidText && (
            <div className="text-negative mx-auto text-center text-sm">{invalidText}</div>
          )}
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
        <Dialog.Button disabled={!!buttonError} onClick={onClickNext} variant="primary">
          다음
        </Dialog.Button>
      </Dialog.ButtonGroup>
    </>
  )
}
