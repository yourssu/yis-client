import clsx from 'clsx'
import { random } from 'es-toolkit'
import { useState } from 'react'
import { useInputState } from 'react-simplikit'
import { z } from 'zod/v4'

import { signup } from '@/apis/auth'
import { Select } from '@/components/Select'
import { useNicknameToYourssuEmail } from '@/hooks/useNicknameToYourssuEmail'
import { useToastedMutation } from '@/hooks/useToastedMutation'
import { useZodFormValidation } from '@/hooks/useZodFormValidation'
import { SignForm } from '@/routes/~_sign/components/SignForm'
import { PartNames } from '@/types/part'
import { assertNonNullish } from '@/utils/assertion'
import { useNavigate } from '@tanstack/react-router'

export const SignupForm = () => {
  const [email, setEmail] = useInputState('')
  const [nickname, setNickname] = useInputState('')
  const [password, setPassword] = useInputState('')
  const [repliedPassword, setRepliedPassword] = useInputState('')
  const [part, setPart] = useState<PartNames | undefined>(undefined)
  const fullEmail = useNicknameToYourssuEmail(email)

  const { invalidMessage, invalidTexts, onChangeWithReset, validate } = useZodFormValidation(
    {
      email: fullEmail,
      password,
      repliedPassword,
      nickname,
      part,
    },
    SignupFormSchema.form
  )

  const { error: buttonError } = SignupFormSchema.button.safeParse({
    email,
    password,
    repliedPassword,
    nickname,
    part,
  })

  const { mutateWithToast, isPending } = useToastedMutation({
    mutationFn: signup,
    successText: '회원가입에 성공했어요. 가입한 정보로 로그인해주세요.',
    errorText: '회원가입에 실패했어요. 잠시후에 다시 시도해주세요.',
  })
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validate().success) {
      return
    }

    assertNonNullish(part)

    const res = await mutateWithToast({
      email: fullEmail,
      password,
      nickname,
      part,
      avatarId: Math.floor(random(12)) + 1,
    })
    if (res) {
      navigate({ to: '/signin', replace: true })
    }
  }

  return (
    <SignForm onSubmit={onSubmit}>
      <div className="flex items-center gap-2">
        <SignForm.Input
          invalid={!!invalidTexts.email}
          onChange={onChangeWithReset(setEmail)}
          placeholder="이메일"
          value={email}
        />
        <div className="text-neutralMuted font-medium">.urssu@gmail.com</div>
      </div>
      <SignForm.Input
        autoComplete="off"
        invalid={!!invalidTexts.password}
        onChange={onChangeWithReset(setPassword)}
        placeholder="비밀번호"
        type="password"
        value={password}
      />
      <SignForm.Input
        autoComplete="off"
        invalid={!!invalidTexts.repliedPassword}
        onChange={onChangeWithReset(setRepliedPassword)}
        placeholder="비밀번호 확인"
        type="password"
        value={repliedPassword}
      />
      <SignForm.Input
        invalid={!!invalidTexts.nickname}
        onChange={onChangeWithReset(setNickname)}
        placeholder="닉네임"
        value={nickname}
      />
      <Select
        invalid={!!invalidTexts.part}
        items={PartNames}
        onValueChange={onChangeWithReset(setPart)}
        placeholder="소속 파트"
        value={part}
      />
      {!!invalidMessage && (
        <div className={clsx('text-negative w-full text-center text-sm')}>{invalidMessage}</div>
      )}
      <SignForm.Button disabled={!!buttonError || isPending} type="submit">
        회원가입
      </SignForm.Button>
    </SignForm>
  )
}

const baseValidation = {
  email: z.string().min(1, { message: '이메일을 입력해주세요.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
  repliedPassword: z.string().min(1, { message: '확인 비밀번호를 입력해주세요.' }),
  nickname: z.string().min(1, { message: '닉네임을 입력해주세요.' }),
  part: z.enum(PartNames, { message: '소속 파트를 선택해주세요.' }),
}

const SignupFormSchema = {
  button: z.object(baseValidation),
  form: z
    .object({
      ...baseValidation,
      email: baseValidation.email.email('이메일 형식이 올바르지 않아요.'),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.repliedPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '확인 비밀번호가 일치하지 않아요.',
          path: ['repliedPassword'],
        })
      }
    }),
}
