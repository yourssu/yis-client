import { useState } from 'react'
import { useInputState } from 'react-simplikit'

import { ApplicationPlaceholder } from '@/components/CreateDeploymentFunnelStep/hooks/useCreateDeploymentMutation'
import { useFillMockDeploymentData } from '@/components/CreateDeploymentFunnelStep/hooks/useFillMockDeploymentData'
import { DeployConfirmedContext, DeployContext } from '@/components/CreateDeploymentFunnelStep/type'
import { Dialog } from '@/components/Dialog'
import { NumberInput } from '@/components/TextInput/NumberInput'
import { TextInput } from '@/components/TextInput/TextInput'
import { STAGE } from '@/config'
import { useZodFormValidation } from '@/hooks/useZodFormValidation'
import { DeploymentInfoFormSchema } from '@/types/deployment'
import { assertNonNullish } from '@/utils/assertion'

type DeploymentInfoFormProps<TApplication extends ApplicationPlaceholder | undefined> =
  (TApplication extends ApplicationPlaceholder
    ? { close: () => void; onPrevious?: never }
    : { close?: never; onPrevious: () => void }) & {
    application?: TApplication
    initialValue?: DeployContext
    onNext: (c: DeployConfirmedContext) => void
  }

export const DeploymentInfoFormStep = <TApplication extends ApplicationPlaceholder | undefined>({
  initialValue,
  application,
  onNext,
  onPrevious,
  close,
}: DeploymentInfoFormProps<TApplication>) => {
  const [domainName, setDomainName] = useInputState(initialValue?.domainName ?? '')
  const [imageUrl, setImageUrl] = useInputState(initialValue?.imageUrl ?? '')
  const [port, setPort] = useState<number | undefined>(initialValue?.port)
  const [message, setMessage] = useInputState(initialValue?.message ?? '')

  const formData = {
    domainName,
    imageUrl,
    port,
    message,
  }

  const { invalidMessage, invalidTexts, onChangeWithReset, validate } = useZodFormValidation(
    formData,
    DeploymentInfoFormSchema.form()
  )
  const { error: buttonError } = DeploymentInfoFormSchema.base.safeParse(formData)

  const [isFillMockDeploymentDataPending, fillMockDeploymentData] = useFillMockDeploymentData({
    application,
  })

  const onClickNext = () => {
    if (!validate().success) {
      return
    }

    assertNonNullish(port)
    onNext({ domainName, imageUrl, port, message })
  }

  return (
    <>
      <Dialog.Content className="h-[440px] w-[500px]">
        <div className="flex flex-col gap-4 pb-8">
          <TextInput
            description="http, https 없이 입력해주세요."
            invalid={!!invalidTexts.domainName}
            onChange={onChangeWithReset(setDomainName)}
            placeholder="도메인 (예: www.example.com)"
            value={domainName}
          />
          <NumberInput
            invalid={!!invalidTexts.port}
            onChange={onChangeWithReset(setPort)}
            placeholder="포트 번호"
            value={port}
          />
          <TextInput
            description="ex) alexwhen/docker-2048:latest2"
            invalid={!!invalidTexts.imageUrl}
            onChange={onChangeWithReset(setImageUrl)}
            placeholder="도커 이미지 링크"
            value={imageUrl}
          />
          <TextInput
            description="관리자가 추가로 알아야 할 사항이 있다면 적어주세요."
            invalid={!!invalidTexts.message}
            onChange={onChangeWithReset(setMessage)}
            placeholder="남길 메시지 (선택)"
            value={message}
          />
          {!!invalidMessage && (
            <div className="text-negative mx-auto text-center text-sm">{invalidMessage}</div>
          )}
        </div>
      </Dialog.Content>
      <Dialog.ButtonGroup>
        {STAGE === 'dev' && close && (
          <Dialog.Button
            disabled={isFillMockDeploymentDataPending}
            onClick={async () => {
              await fillMockDeploymentData()
              close()
            }}
            variant="secondary"
          >
            테스트 데이터 채우기 (개발)
          </Dialog.Button>
        )}
        {onPrevious && (
          <Dialog.Button
            disabled={isFillMockDeploymentDataPending}
            onClick={onPrevious}
            variant="subPrimary"
          >
            이전
          </Dialog.Button>
        )}
        <Dialog.Button
          disabled={!!buttonError || isFillMockDeploymentDataPending}
          onClick={onClickNext}
          variant="primary"
        >
          다음
        </Dialog.Button>
      </Dialog.ButtonGroup>
    </>
  )
}
