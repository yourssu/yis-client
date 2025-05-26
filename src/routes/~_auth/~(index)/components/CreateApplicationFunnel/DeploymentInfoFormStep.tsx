import { useState } from 'react'
import { useInputState } from 'react-simplikit'
import { z } from 'zod'

import { Dialog } from '@/components/Dialog'
import { NumberInput } from '@/components/TextInput/NumberInput'
import { TextInput } from '@/components/TextInput/TextInput'
import { useZodFormValidation } from '@/hooks/useZodFormValidation'
import { DeployConfirmedContext, DeployContext } from '@/routes/~_auth/~(index)/type'
import { assertNonNullish } from '@/utils/assertion'
import { regexes } from '@/utils/regex'

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
    DeploymentInfoFormSchema.form
  )

  const { error: buttonError } = DeploymentInfoFormSchema.button.safeParse(formData)

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

const baseValidation = {
  domain: z.string().min(1, { message: '도메인을 입력해주세요.' }),
  port: z.number(),
  imageUrl: z.string().min(1, { message: '도커 이미지 링크를 입력해주세요.' }),
}

const DeploymentInfoFormSchema = {
  button: z.object(baseValidation),
  form: z.object({
    domain: baseValidation.domain
      .refine((domain) => !(domain.startsWith('http://') || domain.startsWith('https://')), {
        message: '도메인에 http 또는 https가 포함되어 있어요.',
      })
      .refine((domain) => regexes.hostname.test(domain), {
        message: '도메인 형식이 올바르지 않아요.',
      }),
    port: baseValidation.port
      .min(0, { message: '포트 번호가 올바르지 않아요.' })
      .max(65535, { message: '포트 번호가 올바르지 않아요.' }),
    imageUrl: baseValidation.imageUrl,
    message: z.string().optional(),
  }),
}
