import { IoMdTrash } from 'react-icons/io'

import { deleteUser, useAllUsersInvalidation } from '@/apis/user'
import { Dialog } from '@/components/Dialog'
import { Menu } from '@/components/Menu'
import { useAlertDialog } from '@/hooks/useAlertDialog'
import { useToastedMutation } from '@/hooks/useToastedMutation'

interface UserDeleteMenuButtonProps {
  userId: number
}

export const UserDeleteMenuButton = ({ userId }: UserDeleteMenuButtonProps) => {
  const openDeleteConfirmAlertDialog = useAlertDialog()
  const { mutateWithToast: mutateDeleteUser, isPending } = useToastedMutation({
    mutationFn: () => deleteUser(userId),
    successText: '사용자를 삭제했어요.',
    errorText: '사용자 삭제에 실패했어요. 잠시 후 다시 시도해주세요.',
  })
  const invalidateAllUsers = useAllUsersInvalidation()

  const onClickDeleteUser = async () => {
    await openDeleteConfirmAlertDialog({
      title: '정말 사용자를 삭제할까요?',
      closeButton: true,
      closeableWithOutside: false,
      content: ({ closeAsTrue, closeAsFalse }) => (
        <>
          <Dialog.Content>사용자를 삭제한 후에는 되돌릴 수 없어요.</Dialog.Content>
          <Dialog.ButtonGroup>
            <Dialog.Button disabled={isPending} onClick={closeAsFalse} variant="secondary">
              취소
            </Dialog.Button>
            <Dialog.Button
              disabled={isPending}
              onClick={async () => {
                await mutateDeleteUser()
                invalidateAllUsers()
                closeAsTrue()
              }}
              variant="primary"
            >
              삭제하기
            </Dialog.Button>
          </Dialog.ButtonGroup>
        </>
      ),
    })
  }

  return (
    <Menu.ButtonItem
      className="flex items-center gap-2.5 rounded-md px-3 py-2 font-medium"
      onClick={onClickDeleteUser}
    >
      <IoMdTrash className="text-red500 size-4.5" />
      삭제하기
    </Menu.ButtonItem>
  )
}
