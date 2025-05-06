import { useState } from 'react'
import { useInputState } from 'react-simplikit'

import { Label } from '@/components/Label'
import { Select } from '@/components/Select'
import { TextInput } from '@/components/TextInput'
import { PartName, partNames } from '@/types/part'

export const ProfileEditForm = () => {
  const [nickname, setNickname] = useInputState('Feca')
  const [email, setEmail] = useInputState('feca.urssu@gmail.com')
  const [part, setPart] = useState<PartName>('Frontend')

  return (
    <div className="flex w-[500px] flex-col gap-3 pt-2.5 pb-4">
      <TextInput label="닉네임" onChange={setNickname} placeholder="닉네임" value={nickname} />
      <TextInput label="이메일" onChange={setEmail} placeholder="이메일" value={email} />
      <Label content="소속 파트">
        <Select
          className="w-full"
          items={partNames}
          onValueChange={setPart}
          placeholder="소속 파트"
          value={part}
          viewportClassName="!bg-grey200"
        />
      </Label>
    </div>
  )
}
