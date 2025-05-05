import { useInputState } from 'react-simplikit'

import { SignForm } from '@/routes/~_sign/components/SignForm'

export const SigninForm = () => {
  const [nickname, setNickname] = useInputState('')
  const [password, setPassword] = useInputState('')

  const isFormValid = nickname.length > 0 && password.length > 0

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isFormValid) {
      return
    }
  }

  return (
    <SignForm onSubmit={onSubmit}>
      <div className="flex items-center gap-2">
        <SignForm.Input onChange={setNickname} placeholder="닉네임" value={nickname} />
        <div className="text-neutralMuted font-medium">.urssu@gmail.com</div>
      </div>
      <SignForm.Input
        onChange={setPassword}
        placeholder="비밀번호"
        type="password"
        value={password}
      />
      <SignForm.Button disabled={!isFormValid} type="submit">
        로그인
      </SignForm.Button>
    </SignForm>
  )
}
