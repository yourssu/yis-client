import { useState } from 'react'
import { useInputState } from 'react-simplikit'
import { z } from 'zod'

import { checkApplicationNameUnique } from '@/apis/application'
import { Dialog } from '@/components/Dialog'
import { TextInput } from '@/components/TextInput/TextInput'
import { STAGE } from '@/config'
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
  const [invalid, setInvalid] = useState(false)
  const fillMockApplicationData = useFillMockApplicationData()
  const { mutateAsync } = useMutation({
    mutationFn: checkApplicationNameUnique,
  })

  const { error } = ApplicationFormSchema.safeParse({
    name,
    description,
  })

  const onClick = async () => {
    const isUnique = await mutateAsync(name)

    if (!isUnique) {
      setInvalid(true)
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
            invalid={invalid}
            onChange={(e) => {
              setInvalid(false)
              setName(e)
            }}
            placeholder="서비스 이름"
            value={name}
          />
          <TextInput
            onChange={setDescription}
            placeholder="서비스 설명 (선택)"
            value={description}
          />
          {invalid && (
            <div className="text-negative text-sm">이미 중복된 서비스 이름이 있어요.</div>
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
        <Dialog.Button disabled={!!error} onClick={onClick} variant="primary">
          다음
        </Dialog.Button>
      </Dialog.ButtonGroup>
    </>
  )
}

const ApplicationFormSchema = z.object({
  name: z.string().min(1, { message: '서비스 이름을 입력해주세요.' }),
  description: z.string().optional(),
})
