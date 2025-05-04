import { createLazyFileRoute } from '@tanstack/react-router'

import { GNB } from '../../components/GNB'
import { GrainyBackground } from './components/GrainyBackground'

const Login = () => {
  return (
    <div>
      <GNB />
      <GrainyBackground />
    </div>
  )
}

export const Route = createLazyFileRoute('/login/')({
  component: Login,
})
