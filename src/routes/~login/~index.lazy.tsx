import { createLazyFileRoute } from '@tanstack/react-router'

const Login = () => {
  return <div>로그인</div>
}

export const Route = createLazyFileRoute('/login/')({
  component: Login,
})
