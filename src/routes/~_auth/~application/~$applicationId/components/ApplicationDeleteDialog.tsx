import { useInputState } from 'react-simplikit'

import { deleteApplication } from '@/apis/application'
import { Dialog } from '@/components/Dialog'
import { TextInput } from '@/components/TextInput/TextInput'
import { useToastedMutation } from '@/hooks/useToastedMutation'
import { FullApplicationType } from '@/types/application'

interface ApplicationDeleteDialogProps {
  application: FullApplicationType
  closeDialog: () => void
}

export const ApplicationDeleteDialog = ({
  closeDialog,
  application,
}: ApplicationDeleteDialogProps) => {
  const [applicationNameReply, setApplicationNameReply] = useInputState('')
  const { mutateWithToast: mutateDeleteApplication, isPending } = useToastedMutation({
    mutationFn: deleteApplication,
    successText: '서비스를 삭제했어요.',
    errorText: '서비스 삭제에 실패했어요. 잠시 후 다시 시도해주세요.',
  })

  const replied = applicationNameReply === application.name

  const onClick = async () => {
    if (!replied) {
      return
    }
    if (await mutateDeleteApplication(application.id)) {
      closeDialog()
    }
  }

  return (
    <>
      <Dialog.Content>
        <div className="mb-4">삭제된 서비스는 다시 되돌릴 수 없어요.</div>
        <div className="mb-2 text-sm font-semibold">
          삭제하려면 "{application.name}" 을 아래에 입력해주세요.
        </div>
        <TextInput
          invalid={!replied}
          onChange={setApplicationNameReply}
          placeholder={application.name}
          value={applicationNameReply}
        />
      </Dialog.Content>
      <Dialog.ButtonGroup>
        <Dialog.Button disabled={!replied || isPending} onClick={onClick} variant="primary">
          삭제하기
        </Dialog.Button>
      </Dialog.ButtonGroup>
    </>
  )
}
