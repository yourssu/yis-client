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
      const stepSize = Object.keys(funnelRenderProps).length

      /* 
        이벤트 핸들러 내에서 외부 인터페이스를 유지하면서
        퍼널의 변경된 정보를 렌더링할 방법이 없어 랜더링할 컨텐츠에 퍼널 정보를 주입해요.
      */
      // eslint-disable-next-line react/display-name
      const funnelContents = mapValues(funnelRenderProps, ({ content, title }) => (funnelProps) => {
        const dialogHeader = (
          <Dialog.Header onClickCloseButton={closeButton ? closeAsFalse : undefined}>
            <Dialog.Title>
              <div className="text-brandPrimary py-1.5 text-sm font-medium">
                {funnelProps.index + 1}/{stepSize}
              </div>
              <div>{title}</div>
            </Dialog.Title>
          </Dialog.Header>
        )
        const renderedContent = (content as (p: typeof funnelProps) => React.ReactNode)(funnelProps)

        return (
          <>
            {dialogHeader}
            {renderedContent}
          </>
        )
      }) as FunnelRenderComponentProps<TStepContextMap>

      return (
        <Dialog closeableWithOutside={closeableWithOutside} onClose={closeAsFalse} open={isOpen}>
          <funnel.Render {...funnelContents} />
        </Dialog>
      )
    })

  return open
}
