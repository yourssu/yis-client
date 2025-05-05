import { GNB } from '@/components/GNB'
import { createFileRoute, Link } from '@tanstack/react-router'

const Index = () => {
  return (
    <div>
      <GNB />
      <Link to="/signin">로그인</Link>
    </div>
  )
}

export const Route = createFileRoute('/_auth/')({
  component: Index,
})
