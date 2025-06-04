import { useMeInvalidation, useUserInvalidation } from '@/apis/user'
import { ProfileEditDialogForm } from '@/components/EditProfileDialogForm'
import { useAlertDialog } from '@/hooks/useAlertDialog'
import { UserType } from '@/types/user'

interface UseEditUserDialog {
  type: 'me' | 'other'
  user: UserType
}

export const useEditUserDialog = ({ type, user }: UseEditUserDialog) => {
  const openEditAlertDialog = useAlertDialog()
  const invalidateMe = useMeInvalidation()
  const invalidateUser = useUserInvalidation(user.id)

  return async () => {
    const res = await openEditAlertDialog({
      title: `${type === 'me' ? '내' : '사용자'} 정보 수정`,
      closeButton: true,
      content: ({ closeAsTrue }) => {
        return <ProfileEditDialogForm closeDialog={closeAsTrue} type={type} user={user} />
      },
    })

    if (res) {
      if (type === 'me') {
        invalidateMe()
      } else {
        invalidateUser()
      }
    }

    return res
  }
}
