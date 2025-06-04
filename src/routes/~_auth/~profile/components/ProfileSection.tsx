import { UserRoleBadge } from '@/components/Badges/UserRoleBadge'
import { ItemList } from '@/components/ItemList'
import { ProfileAvatar } from '@/components/ProfileAvatar'
import { useEditUserDialog } from '@/hooks/useEditUserDialog'
import { useSuspensedMe } from '@/hooks/useMe'
import { formatTemplates } from '@/utils/date'

export const ProfileSection = () => {
  const me = useSuspensedMe()
  const openEditAlertDialog = useEditUserDialog({ type: 'me', user: me })

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col items-center gap-4">
        <ProfileAvatar avatarId={me.avatarId} rounded size={64} />
        <div className="text-xl font-semibold">{me.nickname}</div>
      </div>

      <ItemList>
        <ItemList.Header>
          내 정보
          <ItemList.HeaderButton onClick={openEditAlertDialog}>수정하기</ItemList.HeaderButton>
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
          <ItemList.Item label="가입일">
            {formatTemplates['(2024년)? 2월 3일, 오후 10:23'](me.createdAt)}
          </ItemList.Item>
        </ItemList.Body>
      </ItemList>
    </div>
  )
}
