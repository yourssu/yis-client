import { createFileRoute, Link } from '@tanstack/react-router'

const Index = () => {
  return (
    <div>
      <Link to="/signin">로그인</Link>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Index,
})
