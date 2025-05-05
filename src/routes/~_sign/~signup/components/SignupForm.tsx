import { useState } from 'react'
import { useInputState } from 'react-simplikit'

import { Select } from '@/components/Select'
import { SignForm } from '@/routes/~_sign/components/SignForm'

export const SignupForm = () => {
  const [email, setEmail] = useInputState('')
  const [nickname, setNickname] = useInputState('')
  const [password, setPassword] = useInputState('')
  const [repliedPassword, setRepliedPassword] = useInputState('')
  const [part, setPart] = useState<PartName | undefined>(undefined)

  const isFormValid =
    email.length > 0 && password.length > 0 && repliedPassword.length > 0 && part !== undefined

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isFormValid) {
      return
    }
  }

  return (
    <SignForm onSubmit={onSubmit}>
      <div className="flex items-center gap-2">
        <SignForm.Input onChange={setEmail} placeholder="이메일" value={email} />
        <div className="text-neutralMuted font-medium">.urssu@gmail.com</div>
      </div>
      <SignForm.Input
        onChange={setPassword}
        placeholder="비밀번호"
        type="password"
        value={password}
      />
      <SignForm.Input
        onChange={setRepliedPassword}
        placeholder="비밀번호 확인"
        type="password"
        value={repliedPassword}
      />
      <SignForm.Input onChange={setNickname} placeholder="닉네임" value={nickname} />
      <Select
        items={partNames}
        onValueChange={(v) => setPart(v)}
        placeholder="소속 파트"
        value={part}
      />
      <SignForm.Button disabled={!isFormValid} type="submit">
        회원가입
      </SignForm.Button>
    </SignForm>
  )
}

const partNames = [
  'HR',
  'iOS',
  'Android',
  'Frontend',
  'Backend',
  'Design',
  'Marketing',
  'Finance',
  'PM',
  'Legal',
] as const

type PartName = (typeof partNames)[number]
