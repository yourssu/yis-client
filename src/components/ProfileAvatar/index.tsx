import clsx from 'clsx'

import { useUserAvatarSrc } from '@/hooks/useUserAvatarSrc'

type ProfileAvatarProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'> & {
  avatarId: number
}

export const ProfileAvatar = ({ className, avatarId, ...props }: ProfileAvatarProps) => {
  const src = useUserAvatarSrc(avatarId)

  return (
    <img
      alt="profile"
      className={clsx('size-full object-contain', className)}
      src={src}
      {...props}
    />
  )
}
