import clsx from 'clsx'

import { useUserAvatarSrc } from '@/hooks/useUserAvatarSrc'

type ProfileAvatarProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'> & {
  userId: number
}

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
