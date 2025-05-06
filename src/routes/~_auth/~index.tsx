import { GNB } from '@/components/GNB'
import { createFileRoute } from '@tanstack/react-router'

const Index = () => {
  return (
    <div>
      <GNB />

      <div className="mx-auto mt-[13vh] flex flex-col items-center gap-6">
        <img alt="server" className="mx-auto size-50" src="/Server.png" />
        <div className="text-neutralMuted mb-6 text-xl font-semibold">
          아직 배포된 서비스가 없어요.
        </div>
        <button className="bg-violet100 text-15 text-brandAdaptive hover:bg-violet200 ease-ease cursor-pointer rounded-xl px-5.5 py-2.5 font-medium transition-colors duration-200">
          서비스 배포하기
        </button>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_auth/')({
  component: Index,
})
