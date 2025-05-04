import { createFileRoute, Link } from '@tanstack/react-router'

const Index = () => {
  return (
    <div>
      <Link to="/login">로그인</Link>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Index,
})
