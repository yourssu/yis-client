import { useAuth } from '@/components/Providers/AuthProvider/hook'
import { Link } from '@tanstack/react-router'

export const GNB = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="flex h-[60px] w-full shrink-0 items-center justify-between px-5">
      <Link className="flex h-10 items-center" to="/">
        <img alt="logo" className="h-4.5" src="/Logo.png" />
      </Link>

      {isAuthenticated() && (
        <div className="size-9 overflow-hidden rounded-full">
          {/* Todo: 유저 아이디에 따라 다른 프로필 이미지 보여주기 */}
          <img alt="profile" className="size-full object-contain" src="/profiles/1.png" />
        </div>
      )}
    </div>
  )
}
