import { useInputState } from 'react-simplikit'
import { z } from 'zod/v4'

import { checkApplicationNameUnique } from '@/apis/application'
import { useFillMockDeploymentData } from '@/components/CreateDeploymentFunnelStep/hooks/useFillMockDeploymentData'
import {
  ApplicationConfirmedContext,
  ApplicationContext,
} from '@/components/CreateDeploymentFunnelStep/type'
import { Dialog } from '@/components/Dialog'
import { TextInput } from '@/components/TextInput/TextInput'
import { STAGE } from '@/config'
import { useZodFormValidation } from '@/hooks/useZodFormValidation'
import { regexes } from '@/utils/regex'
import { useMutation } from '@tanstack/react-query'

interface ApplicationFormProps {
  close: () => void
  initialValue?: ApplicationContext
  onNext: (c: ApplicationConfirmedContext) => void
}

export const ApplicationFormStep = ({ initialValue, onNext, close }: ApplicationFormProps) => {
  const [name, setName] = useInputState(initialValue?.name ?? '')
  const [description, setDescription] = useInputState(initialValue?.description ?? '')

  const {
    invalidMessage,
    invalidTexts,
    setInvalidMessage,
    setInvalidTexts,
    validate,
    onChangeWithReset,
  } = useZodFormValidation({ name, description }, ApplicationFormSchema)

  const [isFillMockDeploymentDataPending, fillMockDeploymentData] = useFillMockDeploymentData()
  const { mutateAsync, isPending: isCheckApplicationNameUniquePending } = useMutation({
    mutationFn: checkApplicationNameUnique,
  })

  const isPending = isFillMockDeploymentDataPending || isCheckApplicationNameUniquePending

  const onClick = async () => {
    if (!validate().success) {
      return
    }

    const isUnique = await mutateAsync(name)
    if (!isUnique) {
      const message = '이미 중복된 서비스 이름이 있어요.'
      setInvalidTexts((prev) => ({ ...prev, name: message }))
      setInvalidMessage(message)
      return
    }

    onNext({
      name,
      description,
    })
  }

  return (
    <>
      <Dialog.Content className="h-[440px] w-[500px]">
        <div className="flex flex-col gap-6 pb-8">
          <TextInput
            description="서비스 이름은 고유해야해요."
            invalid={!!invalidTexts.name}
            onChange={onChangeWithReset(setName)}
            placeholder="서비스 이름"
            value={name}
          />
          <TextInput
            invalid={!!invalidTexts.description}
            onChange={setDescription}
            placeholder="서비스 설명 (선택)"
            value={description}
          />
          {!!invalidMessage && (
            <div className="text-negative text-center text-sm whitespace-pre-wrap">
              {invalidMessage}
            </div>
          )}
        </div>
      </Dialog.Content>
      <Dialog.ButtonGroup>
        {STAGE === 'dev' && (
          <Dialog.Button
            disabled={isPending}
            onClick={async () => {
              await fillMockDeploymentData()
              close()
            }}
            variant="secondary"
          >
            테스트 데이터 채우기 (개발)
          </Dialog.Button>
        )}
        <Dialog.Button
          disabled={name.length === 0 || isPending}
          onClick={onClick}
          variant="primary"
        >
          다음
        </Dialog.Button>
      </Dialog.ButtonGroup>
    </>
  )
}

const ApplicationFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: '서비스 이름을 입력해주세요.' })
    .regex(regexes.applicationName, {
      message:
        '서비스 이름은 영어 소문자로 시작하고,\n영어 소문자, 숫자, 하이픈(-)만 사용할 수 있어요.',
    }),
  description: z.string().optional(),
})
