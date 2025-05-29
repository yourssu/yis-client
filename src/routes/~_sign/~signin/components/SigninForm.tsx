import clsx from 'clsx'
import { useInputState } from 'react-simplikit'
import { z } from 'zod/v4'

import { signin } from '@/apis/auth'
import { useNicknameToYourssuEmail } from '@/hooks/useNicknameToYourssuEmail'
import { useToast } from '@/hooks/useToast'
import { useZodFormValidation } from '@/hooks/useZodFormValidation'
import { SignForm } from '@/routes/~_sign/components/SignForm'
import { setAuthTokens } from '@/utils/auth'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

export const SigninForm = () => {
  const [nickname, setNickname] = useInputState('')
  const [password, setPassword] = useInputState('')
  const email = useNicknameToYourssuEmail(nickname)

  const { error: buttonError } = SigninFormSchema.button.safeParse({
    email: nickname,
    password,
  })
  const { invalidMessage, setInvalidMessage, validate, onChangeWithReset } = useZodFormValidation(
    { email, password },
    SigninFormSchema.form
  )

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signin,
  })
  const toast = useToast()
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validate().success) {
      return
    }

    try {
      const tokens = await mutateAsync({
        email,
        password,
      })
      setAuthTokens(tokens)
      toast.success('로그인에 성공했어요.')
      navigate({ to: '/' })
    } catch {
      setInvalidMessage('이메일 또는 비밀번호를 확인해주세요.')
    }
  }

  return (
    <SignForm onSubmit={onSubmit}>
      <div className="flex items-center gap-2">
        <SignForm.Input
          invalid={!!invalidMessage}
          onChange={onChangeWithReset(setNickname)}
          placeholder="이메일"
          value={nickname}
        />
        <div className="text-neutralMuted font-medium">.urssu@gmail.com</div>
      </div>
      <SignForm.Input
        autoComplete="off"
        invalid={!!invalidMessage}
        onChange={onChangeWithReset(setPassword)}
        placeholder="비밀번호"
        type="password"
        value={password}
      />
      {!!invalidMessage && (
        <div className={clsx('text-negative w-full text-center text-sm')}>{invalidMessage}</div>
      )}
      <SignForm.Button disabled={!!buttonError || isPending} type="submit">
        로그인
      </SignForm.Button>
    </SignForm>
  )
}

const baseValidation = {
  email: z.string().min(1, { message: '이메일을 입력해주세요.' }),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
}

const SigninFormSchema = {
  button: z.object(baseValidation),
  form: z.object({
    email: baseValidation.email.email('이메일 형식이 올바르지 않아요.'),
    password: baseValidation.password,
  }),
}
