import clsx from 'clsx'
import { useState } from 'react'
import { useInputState } from 'react-simplikit'
import { z } from 'zod'

import { Select } from '@/components/Select'
import { SignForm } from '@/routes/~_sign/components/SignForm'

export const SignupForm = () => {
  const [email, setEmail] = useInputState('')
  const [nickname, setNickname] = useInputState('')
  const [password, setPassword] = useInputState('')
  const [repliedPassword, setRepliedPassword] = useInputState('')
  const [part, setPart] = useState<PartName | undefined>(undefined)
  const [invalid, setInvalid] = useState(false)

  const isFormValid =
    email.length > 0 && password.length > 0 && repliedPassword.length > 0 && part !== undefined

  const onChangeWrapper = <T extends HTMLElement>(fn: React.ChangeEventHandler<T>) => {
    return (e: React.ChangeEvent<T>) => {
      fn(e)
      setInvalid(false)
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { error } = SignupFormSchema.safeParse({
      email,
      password,
      repliedPassword,
      nickname,
      part,
    })

    if (error) {
      setInvalid(true)
      return
    }
  }

  return (
    <SignForm onSubmit={onSubmit}>
      <div className="flex items-center gap-2">
        <SignForm.Input
          invalid={invalid}
          onChange={onChangeWrapper(setEmail)}
          placeholder="이메일"
          value={email}
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
      <SignForm.Input
        invalid={invalid}
        onChange={onChangeWrapper(setRepliedPassword)}
        placeholder="비밀번호 확인"
        type="password"
        value={repliedPassword}
      />
      <SignForm.Input
        invalid={invalid}
        onChange={onChangeWrapper(setNickname)}
        placeholder="닉네임"
        value={nickname}
      />
      <Select
        invalid={invalid}
        items={partNames}
        onValueChange={(v) => {
          setPart(v)
          setInvalid(false)
        }}
        placeholder="소속 파트"
        value={part}
      />
      {invalid && (
        <div className={clsx('text-red500 w-full text-center text-sm')}>
          잘못 입력된 정보가 있어요. 다시 확인해주세요.
        </div>
      )}
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

const SignupFormSchema = z
  .object({
    email: z.string(),
    password: z.string().min(1),
    repliedPassword: z.string().min(1),
    nickname: z.string().min(1),
    part: z.enum(partNames),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.repliedPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호가 일치하지 않습니다.',
        path: ['repliedPassword'],
      })
    }
  })
