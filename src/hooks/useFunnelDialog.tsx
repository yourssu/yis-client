import { mapValues } from 'es-toolkit'
import { overlay } from 'overlay-kit'

import { Dialog } from '@/components/Dialog'
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

export const useFunnelDialog = <TStepContextMap extends AnyStepContextMap>(
  options: UseFunnelOptions<TStepContextMap>
) => {
  const funnel = usePureFunnel(options)

  const open = async ({
    closeButton,
    render,
    closeableWithOutside,
  }: UseFunnelDialogOpenProps<TStepContextMap>) =>
    await overlay.openAsync<boolean>(({ isOpen, close }) => {
      const closeAsTrue = () => close(true)
      const closeAsFalse = () => close(false)

      const funnelRenderProps = render({
        dialog: {
          isOpen,
          closeAsTrue,
          closeAsFalse,
        },
        funnel,
      })
      const title = funnelRenderProps[funnel.step].title
      const funnelContents = mapValues(
        funnelRenderProps,
        ({ content }) => content
      ) as FunnelRenderComponentProps<TStepContextMap>

      return (
        <Dialog closeableWithOutside={closeableWithOutside} onClose={closeAsFalse} open={isOpen}>
          <Dialog.Header onClickCloseButton={closeButton ? closeAsFalse : undefined}>
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>
          <funnel.Render {...funnelContents} />
        </Dialog>
      )
    })

  return open
}
