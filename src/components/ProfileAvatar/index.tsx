import clsx from 'clsx'

import { useUserAvatarSrc } from '@/hooks/useUserAvatarSrc'

type ProfileAvatarProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'> & {
  userId: number
}

/* Todo: 유저 아이디에 따라 다른 프로필 이미지 보여주기 */

export const ProfileAvatar = ({ className, userId, ...props }: ProfileAvatarProps) => {
  const src = useUserAvatarSrc(userId)

  return (
    <img
      alt="profile"
      className={clsx('size-full object-contain', className)}
      src={src}
      {...props}
    />
  )
}
