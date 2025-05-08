import { useInputState } from 'react-simplikit'
import { z } from 'zod'

import { Dialog } from '@/components/Dialog'
import { TextInput } from '@/components/TextInput'
import { CreateApplicationFunnelSteps } from '@/routes/~_auth/~(index)/components/CreateApplicationFunnel/type'

type NextStepContext = Required<
  CreateApplicationFunnelSteps['어플리케이션_정보입력']['application']
>

interface ApplicationFormProps {
  onNext: (c: NextStepContext) => void
}

export const ApplicationFormStep = ({ onNext }: ApplicationFormProps) => {
  const [name, setName] = useInputState('')
  const [description, setDescription] = useInputState('')

  const { error } = ApplicationFormSchema.safeParse({
    name,
    description,
  })

  return (
    <>
      <Dialog.Content className="h-[300px] w-[500px]">
        <div className="flex flex-col gap-6 pb-8">
          <TextInput
            description="서비스 이름은 고유해야해요."
            onChange={setName}
            placeholder="서비스 이름"
            value={name}
          />
          <TextInput
            onChange={setDescription}
            placeholder="서비스 설명 (선택)"
            value={description}
          />
        </div>
      </Dialog.Content>
      <Dialog.ButtonGroup>
        <Dialog.Button
          disabled={!!error}
          onClick={() => {
            onNext({ name, description })
          }}
          variant="primary"
        >
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
