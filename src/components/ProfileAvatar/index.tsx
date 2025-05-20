import clsx from 'clsx'

import { useUserAvatarSrc } from '@/hooks/useUserAvatarSrc'

type ProfileAvatarProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'> & {
  avatarId: number
  rounded?: boolean
  size?: number
}

export const ProfileAvatar = ({
  className,
  rounded,
  size,
  avatarId,
  ...props
}: ProfileAvatarProps) => {
  const src = useUserAvatarSrc(avatarId)

  return (
    <div
      className={clsx(rounded && 'overflow-hidden rounded-full')}
      style={{
        width: size,
        height: size,
      }}
    >
      <img
        alt="profile"
        className={clsx('size-full object-contain', className)}
        src={src}
        {...props}
      />
    </div>
  )
}
