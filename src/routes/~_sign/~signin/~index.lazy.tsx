import { InlineLink } from '@/components/InlineLink'
import { SigninForm } from '@/routes/~_sign/~signin/components/SigninForm'
import { SignFooter } from '@/routes/~_sign/components/SignFooter'
import { SignTitle } from '@/routes/~_sign/components/SignTitle'
import { createLazyFileRoute } from '@tanstack/react-router'

const Signin = () => {
  return (
    <>
      <SignTitle>유어슈 이메일로 로그인</SignTitle>
      <SigninForm />
      <SignFooter>
        아직 YIS 계정이 없으신가요?
        <InlineLink to="/signup">가입하기</InlineLink>
      </SignFooter>
    </>
  )
}

export const Route = createLazyFileRoute('/_sign/signin/')({
  component: Signin,
})
