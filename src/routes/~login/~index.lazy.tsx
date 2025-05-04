import { GNB } from '@/components/GNB'
import { GrainyBackground } from '@/routes/~login/components/GrainyBackground'
import { LoginForm } from '@/routes/~login/components/LoginForm'
import { createLazyFileRoute } from '@tanstack/react-router'

const Login = () => {
  return (
    <div className="flex h-screen flex-col">
      <GrainyBackground />
      <GNB />
      <div className="flex grow flex-col items-center justify-center gap-8">
        <h1 className="block text-3xl font-bold">유어슈 이메일로 로그인</h1>
        <LoginForm />
        <div className="text-neutralSubtle text-sm">아직 YIS 계정이 없으신가요? 가입하기</div>
      </div>
    </div>
  )
}

export const Route = createLazyFileRoute('/login/')({
  component: Login,
})
