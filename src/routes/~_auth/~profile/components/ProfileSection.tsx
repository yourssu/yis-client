import { UserRoleBadge } from '@/components/Badges/UserRoleBadge'
import { ItemList } from '@/components/ItemList'
import { ProfileAvatar } from '@/components/ProfileAvatar'
import { useAlertDialog } from '@/hooks/useAlertDialog'
import { useSuspensedMe } from '@/hooks/useMe'
import { ProfileEditDialogForm } from '@/routes/~_auth/~profile/components/ProfileEditDialogForm'

export const ProfileSection = () => {
  const me = useSuspensedMe()

  const openEditAlertDialog = useAlertDialog()

  const onClickEdit = () => {
    openEditAlertDialog({
      title: '내 정보 수정',
      closeButton: true,
      content: ({ closeAsTrue }) => {
        return <ProfileEditDialogForm onSuccess={closeAsTrue} user={me} />
      },
    })
  }
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col items-center gap-4">
        <div className="size-16 overflow-hidden rounded-full">
          <ProfileAvatar avatarId={me.avatarId} />
        </div>
        <div className="text-xl font-semibold">{me.nickname}</div>
      </div>

      <ItemList>
        <ItemList.Header>
          내 정보
          <ItemList.HeaderButton onClick={onClickEdit}>수정하기</ItemList.HeaderButton>
        </ItemList.Header>
        <ItemList.Body>
          <ItemList.Item label="닉네임">{me.nickname}</ItemList.Item>
          <ItemList.Item label="소속 파트">{me.part}</ItemList.Item>
          <ItemList.Item label="권한">
            <UserRoleBadge role={me.role} size="lg" />
          </ItemList.Item>
          <ItemList.Item label="이메일">{me.email}</ItemList.Item>
          <ItemList.Item label="비밀번호" tooltipContent="비밀번호 변경은 관리자에게 문의해주세요.">
            ********
          </ItemList.Item>
        </ItemList.Body>
      </ItemList>
    </div>
  )
}
