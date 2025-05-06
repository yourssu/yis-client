import { overlay } from 'overlay-kit'

import { Dialog } from '@/components/Dialog'
import { ProfileEditForm } from '@/routes/~_auth/~profile/components/ProfileEditForm'

export const ProfileEditFormDialog = () => {
  const onTriggerDialog = async () => {
    await overlay.openAsync<boolean>(({ isOpen, close }) => (
      <Dialog onClose={() => close(false)} open={isOpen}>
        <Dialog.Header onClickCloseButton={() => close(false)}>
          <Dialog.Title>프로필 수정</Dialog.Title>
        </Dialog.Header>
        <Dialog.Content>
          <ProfileEditForm />
        </Dialog.Content>
        <Dialog.ButtonGroup>
          <Dialog.Button onClick={() => close(true)} variant="primary">
            수정
          </Dialog.Button>
        </Dialog.ButtonGroup>
      </Dialog>
    ))
  }

  return <div onClick={onTriggerDialog}>수정하기</div>
}
