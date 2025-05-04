import { createFileRoute } from '@tanstack/react-router'

const Index = () => {
  return <div>app</div>
}

export const Route = createFileRoute('/')({
  component: Index,
})
