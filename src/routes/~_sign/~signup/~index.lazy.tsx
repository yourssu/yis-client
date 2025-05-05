import { InlineButton } from '@/components/InlineButton'
import { SignupForm } from '@/routes/~_sign/~signup/components/SignupForm'
import { SignFooter } from '@/routes/~_sign/components/SignFooter'
import { SignTitle } from '@/routes/~_sign/components/SignTitle'
import { createLazyFileRoute, Link } from '@tanstack/react-router'

const Signup = () => {
  return (
    <>
      <SignTitle>회원가입</SignTitle>
      <SignupForm />
      <SignFooter>
        YIS 계정이 있으신가요?
        <InlineButton asChild>
          <Link to="/signin">로그인하기</Link>
        </InlineButton>
      </SignFooter>
    </>
  )
}

export const Route = createLazyFileRoute('/_sign/signup/')({
  component: Signup,
})
