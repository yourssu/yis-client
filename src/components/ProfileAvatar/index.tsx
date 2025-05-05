import clsx from 'clsx'

type ProfileAvatarProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'>

/* Todo: 유저 아이디에 따라 다른 프로필 이미지 보여주기 */

export const ProfileAvatar = ({ className, ...props }: ProfileAvatarProps) => {
  return (
    <img
      alt="profile"
      className={clsx('size-full object-contain', className)}
      src="/profiles/1.png"
      {...props}
    />
  )
}
