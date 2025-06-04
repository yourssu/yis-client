export const useUserAvatarSrc = (userId: number) => {
  return `/profiles/${(userId % 12) + 1}.webp`
}
