import { isEqual } from 'es-toolkit'
import { useState } from 'react'
import { useInputState } from 'react-simplikit'
import { z } from 'zod'

import { editUser } from '@/apis/user'
import { Dialog } from '@/components/Dialog'
import { Label } from '@/components/Label'
import { Select } from '@/components/Select'
import { TextInput } from '@/components/TextInput'
import { useToastedMutation } from '@/hooks/useToastedMutation'
import { PartName, partNames } from '@/types/part'
import { checkParsedError } from '@/utils/zod'
interface ProfileEditFormProps {
  onSuccess: () => void
}

export const ProfileEditForm = ({ onSuccess }: ProfileEditFormProps) => {
  const defaultData = {
    nickname: 'Feca',
    email: 'feca.urssu@gmail.com',
    part: 'Frontend' as const,
  }

  const [nickname, setNickname] = useInputState(defaultData.nickname)
  const [email, setEmail] = useInputState(defaultData.email)
  const [part, setPart] = useState<PartName>(defaultData.part)
  const inputData = {
    nickname,
    email,
    part,
  }

  const { mutateWithToast } = useToastedMutation({
    mutationKey: ['profile', 'edit'],
    mutationFn: editUser,
    successText: '내 정보를 수정했어요.',
  })

  const isSameAsDefault = isEqual(defaultData, inputData)
  const { error } = ProfileEditFormSchema.safeParse(inputData)

  const onSubmit = async () => {
    if (error) {
      return
    }

    await mutateWithToast(inputData)
    // Todo: 프로필 인밸리데이션
    onSuccess()
  }

  return (
    <>
      <Dialog.Content>
        <div className="flex w-[500px] flex-col gap-3 pt-2.5 pb-4">
          <TextInput
            invalid={checkParsedError(error, 'nickname')}
            label="닉네임"
            onChange={setNickname}
            placeholder="닉네임"
            value={nickname}
          />
          <TextInput
            invalid={checkParsedError(error, 'email')}
            label="이메일"
            onChange={setEmail}
            placeholder="이메일"
            value={email}
          />
          <Label content="소속 파트">
            <Select
              className="w-full"
              invalid={checkParsedError(error, 'part')}
              items={partNames}
              onValueChange={setPart}
              placeholder="소속 파트"
              value={part}
              viewportClassName="!bg-grey200"
            />
          </Label>
        </div>
      </Dialog.Content>
      <Dialog.ButtonGroup>
        <Dialog.Button disabled={isSameAsDefault || !!error} onClick={onSubmit} variant="primary">
          수정
        </Dialog.Button>
      </Dialog.ButtonGroup>
    </>
  )
}

const ProfileEditFormSchema = z.object({
  nickname: z.string().min(1),
  email: z.string().email().endsWith('.urssu@gmail.com'),
  part: z.enum(partNames),
})
