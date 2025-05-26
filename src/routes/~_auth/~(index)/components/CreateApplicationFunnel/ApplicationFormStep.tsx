import { useInputState } from 'react-simplikit'
import { z } from 'zod'

import { checkApplicationNameUnique } from '@/apis/application'
import { Dialog } from '@/components/Dialog'
import { TextInput } from '@/components/TextInput/TextInput'
import { STAGE } from '@/config'
import { useZodFormValidation } from '@/hooks/useZodFormValidation'
import { useFillMockApplicationData } from '@/routes/~_auth/~(index)/hooks/useFillMockApplicationData'
import { ApplicationConfirmedContext, ApplicationContext } from '@/routes/~_auth/~(index)/type'
import { useMutation } from '@tanstack/react-query'

interface ApplicationFormProps {
  close: () => void
  initialValue?: ApplicationContext
  onNext: (c: ApplicationConfirmedContext) => void
}

export const ApplicationFormStep = ({ initialValue, onNext, close }: ApplicationFormProps) => {
  const [name, setName] = useInputState(initialValue?.name ?? '')
  const [description, setDescription] = useInputState(initialValue?.description ?? '')

  const { invalid, invalidText, setInvalidText, validate } = useZodFormValidation(
    { name, description },
    ApplicationFormSchema
  )

  const fillMockApplicationData = useFillMockApplicationData()
  const { mutateAsync } = useMutation({
    mutationFn: checkApplicationNameUnique,
  })

  const onClick = async () => {
    if (!validate()) {
      return
    }

    const isUnique = await mutateAsync(name)
    if (!isUnique) {
      setInvalidText('이미 중복된 서비스 이름이 있어요.')
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
            invalid={invalid.name}
            onChange={(e) => {
              setInvalidText(undefined)
              setName(e)
            }}
            placeholder="서비스 이름"
            value={name}
          />
          <TextInput
            invalid={invalid.description}
            onChange={setDescription}
            placeholder="서비스 설명 (선택)"
            value={description}
          />
          {!!invalidText && (
            <div className="text-negative text-center text-sm whitespace-pre-wrap">
              {invalidText}
            </div>
          )}
        </div>
      </Dialog.Content>
      <Dialog.ButtonGroup>
        {STAGE === 'dev' && (
          <Dialog.Button
            onClick={async () => {
              await fillMockApplicationData()
              close()
            }}
            variant="secondary"
          >
            테스트 데이터 채우기 (개발)
          </Dialog.Button>
        )}
        <Dialog.Button disabled={name.length === 0} onClick={onClick} variant="primary">
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
    .regex(/^[a-z][a-z0-9-]*$/, {
      message:
        '서비스 이름은 영어 소문자로 시작하고,\n영어 소문자, 숫자, 하이픈(-)만 사용할 수 있어요.',
    }),
  description: z.string().optional(),
})
