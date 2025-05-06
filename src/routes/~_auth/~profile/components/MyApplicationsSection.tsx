import { ItemList } from '@/components/ItemList'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export const MyApplicationsSection = () => {
  return (
    <div className="flex w-full flex-col gap-10">
      <ItemList>
        <ItemList.Header>내 어플리케이션</ItemList.Header>
        <div className="flex w-full flex-col items-center justify-center gap-8 py-12">
          <DotLottieReact
            autoplay
            className="size-12"
            speed={1.2}
            src="/lotties/empty-list.lottie"
          />
          <div className="text-neutralSubtle text-sm font-medium">배포된 어플리케이션이 없어요</div>
        </div>
      </ItemList>
    </div>
  )
}
