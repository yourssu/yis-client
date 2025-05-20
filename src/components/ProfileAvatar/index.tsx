import clsx from 'clsx'

import { useUserAvatarSrc } from '@/hooks/useUserAvatarSrc'

type ProfileAvatarProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'> & {
  avatarId: number
  containerClassName?: string
  rounded?: boolean
  size?: 'full' | number
}

export const ProfileAvatar = ({
  className,
  rounded,
  size,
  avatarId,
  containerClassName,
  ...props
}: ProfileAvatarProps) => {
  const src = useUserAvatarSrc(avatarId)

  return (
    <div
      className={clsx(containerClassName, rounded && 'overflow-hidden rounded-full')}
      style={{
        width: size === 'full' ? '100%' : size,
        height: size === 'full' ? '100%' : size,
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
