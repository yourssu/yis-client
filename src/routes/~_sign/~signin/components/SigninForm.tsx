import clsx from 'clsx'
import { useState } from 'react'
import { useInputState } from 'react-simplikit'
import { z } from 'zod'

import { signin } from '@/apis/auth'
import { useNicknameToYourssuEmail } from '@/hooks/useNicknameToYourssuEmail'
import { useToast } from '@/hooks/useToast'
import { SignForm } from '@/routes/~_sign/components/SignForm'
import { setAuthTokens } from '@/utils/auth'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

export const SigninForm = () => {
  const [nickname, setNickname] = useInputState('')
  const [password, setPassword] = useInputState('')
  const [invalid, setInvalid] = useState(false)
  const email = useNicknameToYourssuEmail(nickname)

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signin,
  })
  const toast = useToast()
  const navigate = useNavigate()

  const isFormValid = !!email && !!password

  const onChangeWrapper = <T extends HTMLElement>(fn: React.ChangeEventHandler<T>) => {
    return (e: React.ChangeEvent<T>) => {
      fn(e)
      setInvalid(false)
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setInvalid(false)

    const { error } = SigninFormSchema.safeParse({
      email,
      password,
    })

    if (error) {
      setInvalid(true)
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
      setInvalid(true)
    }
  }

  return (
    <SignForm onSubmit={onSubmit}>
      <div className="flex items-center gap-2">
        <SignForm.Input
          invalid={invalid}
          onChange={onChangeWrapper(setNickname)}
          placeholder="이메일"
          value={nickname}
        />
        <div className="text-neutralMuted font-medium">.urssu@gmail.com</div>
      </div>
      <SignForm.Input
        invalid={invalid}
        onChange={onChangeWrapper(setPassword)}
        placeholder="비밀번호"
        type="password"
        value={password}
      />
      {invalid && (
        <div className={clsx('text-negative w-full text-center text-sm')}>
          잘못 입력된 정보가 있어요. 다시 확인해주세요.
        </div>
      )}
      <SignForm.Button disabled={!isFormValid || isPending} type="submit">
        로그인
      </SignForm.Button>
    </SignForm>
  )
}

const SigninFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})
