import { Button } from '@/components/Button'
import { GNB } from '@/components/GNB'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen flex-col">
      <GNB fixed />
      <div className="flex grow flex-col items-center justify-center gap-2">
        <DotLottieReact
          autoplay
          className="mb-4 size-[140px]"
          loop
          src="/lotties/notFound.lottie"
        />
        <div className="text-2xl font-semibold">페이지를 찾을 수 없어요</div>
        <div className="text-15 !text-neutralSubtle font-medium">정말 있는 주소인가요?</div>
        <Button
          className="mt-4"
          onClick={() => {
            navigate({ to: '/', replace: true })
          }}
          size="sm"
          variant="primary"
        >
          홈으로 가기
        </Button>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/404')({
  component: NotFound,
})
