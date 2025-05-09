import { isEqual } from 'es-toolkit'
import { useState } from 'react'
import { useInputState } from 'react-simplikit'
import { z } from 'zod'

import { editUser, useMeInvalidation } from '@/apis/user'
import { Dialog } from '@/components/Dialog'
import { Label } from '@/components/Label'
import { Select } from '@/components/Select'
import { TextInput } from '@/components/TextInput/TextInput'
import { useToastedMutation } from '@/hooks/useToastedMutation'
import { PartNames } from '@/types/part'
import { UserType } from '@/types/user'
import { checkParsedError } from '@/utils/zod'

interface ProfileEditDialogFormProps {
  onSuccess: () => void
  user: UserType
}

export const ProfileEditDialogForm = ({ onSuccess, user }: ProfileEditDialogFormProps) => {
  const [nickname, setNickname] = useInputState(user.nickname)
  const [email, setEmail] = useInputState(user.email)
  const [part, setPart] = useState<PartNames>(user.part)
  const inputData = {
    nickname,
    email,
    part,
  }

  const { mutateWithToast, isPending } = useToastedMutation({
    mutationKey: ['profile', 'edit'],
    mutationFn: editUser,
    successText: '내 정보를 수정했어요.',
    errorText: '수정에 실패했어요. 잠시 후 다시 시도해주세요.',
  })
  const invalidateMe = useMeInvalidation()

  const isSameAsDefault = isEqual(user, inputData)
  const { error } = ProfileEditDialogFormSchema.safeParse(inputData)

  const onSubmit = async () => {
    if (error) {
      return
    }

    if (await mutateWithToast({ id: user.id, ...inputData })) {
      invalidateMe()
      onSuccess()
    }
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
              invalid={checkParsedError(error, 'part')}
              items={PartNames}
              onValueChange={setPart}
              placeholder="소속 파트"
              value={part}
              viewPortBackground="grey200"
            />
          </Label>
        </div>
      </Dialog.Content>
      <Dialog.ButtonGroup>
        <Dialog.Button
          disabled={isSameAsDefault || !!error || isPending}
          onClick={onSubmit}
          variant="primary"
        >
          수정
        </Dialog.Button>
      </Dialog.ButtonGroup>
    </>
  )
}

const ProfileEditDialogFormSchema = z.object({
  nickname: z.string().min(1),
  email: z.string().email().endsWith('.urssu@gmail.com'),
  part: z.enum(PartNames),
})
