import { UserRoleBadge } from '@/components/Badges/UserRoleBadge'
import { GNB } from '@/components/GNB'
import { ItemList } from '@/components/ItemList'
import { ProfileAvatar } from '@/components/ProfileAvatar'
import { ProfileEditFormDialog } from '@/routes/~_auth/~profile/components/ProfileEditFormDialog'
import { createLazyFileRoute } from '@tanstack/react-router'

const Settings = () => {
  return (
    <div>
      <GNB />

      <div className="mx-auto mt-10 flex max-w-[800px] flex-col items-center">
        <div className="mb-10 flex flex-col items-center gap-4">
          <div className="size-16 overflow-hidden rounded-full">
            <ProfileAvatar />
          </div>
          <div className="text-xl font-semibold">Feca</div>
        </div>

        <ItemList>
          <ItemList.Header sideContent={<ProfileEditFormDialog />}>내 정보</ItemList.Header>
          <ItemList.Body>
            <ItemList.Item label="닉네임">Feca</ItemList.Item>
            <ItemList.Item label="소속 파트">Frontend</ItemList.Item>
            <ItemList.Item label="권한">
              <UserRoleBadge role="ADMIN" size="lg" />
            </ItemList.Item>
            <ItemList.Item label="이메일">feca.urssu@gmail.com</ItemList.Item>
            <ItemList.Item
              label="비밀번호"
              tooltipContent="비밀번호 변경은 관리자에게 문의해주세요."
            >
              ********
            </ItemList.Item>
          </ItemList.Body>
        </ItemList>
      </div>
    </div>
  )
}

export const Route = createLazyFileRoute('/_auth/profile/')({
  component: Settings,
})
