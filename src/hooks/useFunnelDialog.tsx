import { mapValues } from 'es-toolkit'
import { overlay } from 'overlay-kit'

import { Dialog } from '@/components/Dialog'
import { useAlertDialog } from '@/hooks/useAlertDialog'
import { usePureFunnel } from '@/hooks/usePureFunnel'
import { UseFunnelOptions, UseFunnelResults as UseFunnelResultsPrimitive } from '@use-funnel/core'
import { AnyStepContextMap } from 'node_modules/@use-funnel/core/dist/core'

type UseFunnelResults<TStepContextMap extends AnyStepContextMap> = UseFunnelResultsPrimitive<
  TStepContextMap,
  Partial<Record<string, any>>
>

type UseFunnelRender<TStepContextMap extends AnyStepContextMap> =
  UseFunnelResults<TStepContextMap>['Render']

type FunnelRenderComponentProps<TStepContextMap extends AnyStepContextMap> = Parameters<
  UseFunnelRender<TStepContextMap>
>['0']

interface OverlayProps<TStepContextMap extends AnyStepContextMap> {
  dialog: {
    closeAsFalse: () => void
    closeAsTrue: () => void
    isOpen: boolean
  }
  funnel: UseFunnelResults<TStepContextMap>
}

interface UseFunnelDialogOpenProps<TStepContextMap extends AnyStepContextMap> {
  closeableWithOutside?: boolean
  closeButton?: boolean
  render: (props: OverlayProps<TStepContextMap>) => {
    [TStepKey in keyof TStepContextMap & string]: {
      content: FunnelRenderComponentProps<TStepContextMap>[TStepKey]
      title: string
    }
  }
}

const FunnelDialog = <TStepContextMap extends AnyStepContextMap>({
  funnelDialogOpenProps,
  funnelOptions,
  overlayOpenProps,
}: {
  funnelDialogOpenProps: UseFunnelDialogOpenProps<TStepContextMap>
  funnelOptions: UseFunnelOptions<TStepContextMap>
  overlayOpenProps: { close: (value: boolean) => void; isOpen: boolean }
}) => {
  const funnel = usePureFunnel(funnelOptions)
  const openDirtyFormAlertDialog = useAlertDialog()

  const closeAsTrue = () => overlayOpenProps.close(true)
  const closeAsFalse = () => overlayOpenProps.close(false)

  const askClose = async () => {
    const respondedClose = await openDirtyFormAlertDialog({
      title: '서비스 배포를 그만할까요?',
      content: ({ closeAsTrue, closeAsFalse }) => (
        <>
          <Dialog.Content className="text-neutralSubtle text-sm">
            지금까지 입력한 정보는 저장되지 않아요.
          </Dialog.Content>
          <Dialog.ButtonGroup>
            <Dialog.Button onClick={closeAsFalse} variant="secondary">
              계속하기
            </Dialog.Button>
            <Dialog.Button onClick={closeAsTrue} variant="primary">
              그만하기
            </Dialog.Button>
          </Dialog.ButtonGroup>
        </>
      ),
    })
    if (respondedClose) {
      requestAnimationFrame(() => {
        closeAsFalse()
      })
    }
  }

  const funnelRenderProps = funnelDialogOpenProps.render({
    dialog: {
      isOpen: overlayOpenProps.isOpen,
      closeAsTrue,
      closeAsFalse,
    },
    funnel,
  })

  const stepSize = Object.keys(funnelRenderProps).length
  const title = funnelRenderProps[funnel.step].title
  const funnelContents = mapValues(
    funnelRenderProps,
    ({ content }) => content
  ) as FunnelRenderComponentProps<TStepContextMap>

  return (
    <Dialog
      closeableWithOutside={funnelDialogOpenProps.closeableWithOutside}
      contentProps={{
        onEscapeKeyDown: (e) => {
          e.preventDefault()
          askClose()
        },
      }}
      onClose={closeAsFalse}
      open={overlayOpenProps.isOpen}
    >
      <Dialog.Header onClickCloseButton={funnelDialogOpenProps.closeButton ? askClose : undefined}>
        <Dialog.Title>
          <div className="text-brandPrimary py-1.5 text-sm font-medium">
            {funnel.index + 1}/{stepSize}
          </div>
          <div>{title}</div>
        </Dialog.Title>
      </Dialog.Header>
      <funnel.Render {...funnelContents} />
    </Dialog>
  )
}

export const useFunnelDialog = <TStepContextMap extends AnyStepContextMap>(
  options: UseFunnelOptions<TStepContextMap>
) => {
  return async (funnelDialogOpenProps: UseFunnelDialogOpenProps<TStepContextMap>) =>
    await overlay.openAsync<boolean>((overlayOpenProps) => {
      return (
        <FunnelDialog
          funnelDialogOpenProps={funnelDialogOpenProps}
          funnelOptions={options}
          overlayOpenProps={overlayOpenProps}
        />
      )
    })
}
