import { useState } from 'react'
import { z } from 'zod'

import { Dialog } from '@/components/Dialog'
import { Label } from '@/components/Label'
import { Select } from '@/components/Select'
import {
  ResourceConfirmedContext,
  ResourceContext,
} from '@/routes/~_auth/~(index)/components/CreateApplicationFunnel/type'
import { CpuResourceNames, MemoryResourceNames } from '@/types/resource'
import { assertNonNullish } from '@/utils/assertion'

interface ResourcesFormProps {
  initialValue?: ResourceContext
  onNext: (c: ResourceConfirmedContext) => void
  onPrevious: () => void
}

export const ResourcesFormStep = ({ initialValue, onNext, onPrevious }: ResourcesFormProps) => {
  const [cpuRequest, setCpuRequest] = useState(initialValue?.cpuRequest)
  const [cpuLimit, setCpuLimit] = useState(initialValue?.cpuLimit)
  const [memoryRequest, setMemoryRequest] = useState(initialValue?.memoryRequest)
  const [memoryLimit, setMemoryLimit] = useState(initialValue?.memoryLimit)

  const { error } = ResourcesFormSchema.safeParse({
    cpuRequest,
    cpuLimit,
    memoryRequest,
    memoryLimit,
  })

  return (
    <>
      <Dialog.Content className="h-[400px] w-[500px]">
        <div className="flex flex-col gap-6 pb-8">
          <div className="bg-grey50 rounded-md p-4 text-sm">
            온프렘 서버 리소스가 제한되어 있기 때문에 요청 리소스가 크면 요청이 거부될 수 있어요.
          </div>
          <Label content="CPU">
            <div className="flex items-center gap-2">
              <Select
                items={CpuResourceNames}
                onValueChange={setCpuRequest}
                placeholder="CPU Request"
                value={cpuRequest}
                viewPortBackground="grey200"
              />
              <div>~</div>
              <Select
                items={CpuResourceNames}
                onValueChange={setCpuLimit}
                placeholder="CPU Limit"
                value={cpuLimit}
                viewPortBackground="grey200"
              />
            </div>
          </Label>
          <Label content="메모리">
            <div className="flex items-center gap-2">
              <Select
                items={MemoryResourceNames}
                onValueChange={setMemoryRequest}
                placeholder="Memory Request"
                value={memoryRequest}
                viewPortBackground="grey200"
              />
              <Select
                items={MemoryResourceNames}
                onValueChange={setMemoryLimit}
                placeholder="Memory Limit"
                value={memoryLimit}
                viewPortBackground="grey200"
              />
            </div>
          </Label>
        </div>
      </Dialog.Content>
      <Dialog.ButtonGroup>
        <Dialog.Button onClick={onPrevious} variant="subPrimary">
          이전
        </Dialog.Button>
        <Dialog.Button
          disabled={!!error}
          onClick={() => {
            if (error) {
              return
            }

            assertNonNullish(cpuRequest)
            assertNonNullish(cpuLimit)
            assertNonNullish(memoryRequest)
            assertNonNullish(memoryLimit)

            onNext({
              cpuRequest,
              cpuLimit,
              memoryRequest,
              memoryLimit,
            })
          }}
          variant="primary"
        >
          다음
        </Dialog.Button>
      </Dialog.ButtonGroup>
    </>
  )
}

const ResourcesFormSchema = z.object({
  cpuRequest: z.enum(CpuResourceNames),
  cpuLimit: z.enum(CpuResourceNames),
  memoryRequest: z.enum(MemoryResourceNames),
  memoryLimit: z.enum(MemoryResourceNames),
})
