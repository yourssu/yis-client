import { useState } from 'react'
import { useInputState } from 'react-simplikit'
import { z } from 'zod/v4'

import { useApplicationDeploymentsInvalidation } from '@/apis/application'
import { updateDeploymentAsRequest } from '@/apis/deployment'
import { Dialog } from '@/components/Dialog'
import { Divider } from '@/components/Divider'
import { Label } from '@/components/Label'
import { Select } from '@/components/Select'
import { NumberInput } from '@/components/TextInput/NumberInput'
import { TextInput } from '@/components/TextInput/TextInput'
import { VerticalDivider } from '@/components/VerticalDivider'
import { useToastedMutation } from '@/hooks/useToastedMutation'
import { useZodFormValidation } from '@/hooks/useZodFormValidation'
import { DeploymentManifestType } from '@/types/deployment'
import { CPUResourceValueNames, MemoryResourceNames } from '@/types/resource'
import { assertNonNullish } from '@/utils/assertion'
import { mutable } from '@/utils/misc'
import { regexes } from '@/utils/regex'

interface DeploymentEditFormProps {
  applicationId: number
  defaultValue: Omit<z.infer<typeof DeploymentEditFormSchema.form>, 'message'>
  deploymentId: number
  isRequestResend: boolean
  manifests: DeploymentManifestType[] | undefined
}

export const ApplicationDeploymentDetailEditForm = ({
  applicationId,
  deploymentId,
  defaultValue,
  manifests,
  isRequestResend,
}: DeploymentEditFormProps) => {
  const [domainName, setDomainName] = useInputState(defaultValue.domainName)
  const [imageUrl, setImageUrl] = useInputState(defaultValue.imageUrl)
  const [port, setPort] = useState<number | undefined>(defaultValue.port)
  const [message, setMessage] = useInputState('')
  const [cpuRequests, setCpuRequests] = useState(defaultValue.cpuRequests)
  const [cpuLimits, setCpuLimits] = useState(defaultValue.cpuLimits)
  const [memoryRequests, setMemoryRequests] = useState(defaultValue.memoryRequests)
  const [memoryLimits, setMemoryLimits] = useState(defaultValue.memoryLimits)

  const formValue = {
    domainName,
    imageUrl,
    port,
    message,
    cpuRequests,
    cpuLimits,
    memoryRequests,
    memoryLimits,
  }

  const { invalid, invalidText, validate, onChangeWithReset, reset } = useZodFormValidation(
    formValue,
    DeploymentEditFormSchema.form
  )
  const { error: buttonError } = DeploymentEditFormSchema.button.safeParse(formValue)

  const { mutateWithToast } = useToastedMutation({
    mutationFn: updateDeploymentAsRequest,
    successText: isRequestResend ? '배포를 재요청했어요.' : '배포 정보를 수정했어요.',
    errorText: isRequestResend ? '배포 재요청에 실패했어요.' : '배포 정보 수정에 실패했어요.',
  })
  const invalidateApplicationDeployments = useApplicationDeploymentsInvalidation(applicationId)

  const onClick = async () => {
    if (!validate()) {
      return
    }

    assertNonNullish(port)

    const res = await mutateWithToast({
      deploymentId,
      manifests,
      deployment: {
        domainName,
        imageUrl,
        port,
        cpuRequests,
        cpuLimits,
        memoryRequests,
        memoryLimits,
        message,
      },
    })
    if (res) {
      invalidateApplicationDeployments()
    }
  }

  return (
    <>
      <Dialog.Content className="max-w-full">
        <div className="flex w-[720px] flex-col py-2">
          <div className="flex w-[720px] gap-5">
            <div className="flex w-full flex-col gap-4 pb-5">
              <div className="text-sm font-semibold">배포 정보</div>
              <TextInput
                description="http, https 없이 입력해주세요."
                invalid={invalid.domainName}
                label="도메인"
                onChange={onChangeWithReset(setDomainName)}
                placeholder="도메인 (예: www.example.com)"
                value={domainName}
              />
              <NumberInput
                invalid={invalid.port}
                label="포트 번호"
                onChange={onChangeWithReset(setPort)}
                placeholder="포트 번호"
                value={port}
              />
              <TextInput
                description="ex) alexwhen/docker-2048:latest2"
                invalid={invalid.imageUrl}
                label="도커 이미지 링크"
                onChange={onChangeWithReset(setImageUrl)}
                placeholder="도커 이미지 링크"
                value={imageUrl}
              />
            </div>
            <VerticalDivider />
            <div className="flex w-full flex-col gap-4 pb-5">
              <div className="text-sm font-semibold">리소스 정보</div>
              <div className="bg-grey50 rounded-md p-4 text-sm">
                온프렘 서버 리소스가 제한되어 있기 때문에 요청 리소스가 크면 요청이 거부될 수
                있어요.
              </div>
              <Label content="CPU">
                <div className="flex items-center gap-2">
                  <Select
                    invalid={invalid.cpuRequests}
                    items={CPUResourceValueNames}
                    onValueChange={(v) => {
                      setCpuRequests(v)
                      reset()
                    }}
                    placeholder="CPU Request"
                    value={cpuRequests}
                    viewPortBackground="grey200"
                  />
                  <div>~</div>
                  <Select
                    invalid={invalid.cpuLimits}
                    items={CPUResourceValueNames}
                    onValueChange={(v) => {
                      setCpuLimits(v)
                      reset()
                    }}
                    placeholder="CPU Limit"
                    value={cpuLimits}
                    viewPortBackground="grey200"
                  />
                </div>
              </Label>
              <Label content="메모리">
                <div className="flex items-center gap-2">
                  <Select
                    invalid={invalid.memoryRequests}
                    items={MemoryResourceNames}
                    onValueChange={(v) => {
                      setMemoryRequests(v)
                      reset()
                    }}
                    placeholder="Memory Request"
                    value={memoryRequests}
                    viewPortBackground="grey200"
                  />
                  <div>~</div>
                  <Select
                    invalid={invalid.memoryLimits}
                    items={MemoryResourceNames}
                    onValueChange={(v) => {
                      setMemoryLimits(v)
                      reset()
                    }}
                    placeholder="Memory Limit"
                    value={memoryLimits}
                    viewPortBackground="grey200"
                  />
                </div>
              </Label>
            </div>
          </div>
          <Divider className="mb-5" />
          <TextInput
            description="관리자가 추가로 알아야 할 사항이 있다면 적어주세요."
            invalid={invalid.message}
            onChange={onChangeWithReset(setMessage)}
            placeholder="남길 메시지 (선택)"
            value={message}
          />
          {invalidText && (
            <div className="text-negative mx-auto mt-6 text-center text-sm">{invalidText}</div>
          )}
        </div>
      </Dialog.Content>
      <Dialog.ButtonGroup>
        <Dialog.Button disabled={!!buttonError} onClick={onClick} variant="primary">
          수정하기
        </Dialog.Button>
      </Dialog.ButtonGroup>
    </>
  )
}

const baseValidation = {
  domainName: z.string().min(1, { message: '도메인을 입력해주세요.' }),
  port: z.number(),
  imageUrl: z.string().min(1, { message: '도커 이미지 링크를 입력해주세요.' }),
  cpuRequests: z.enum(CPUResourceValueNames),
  cpuLimits: z.enum(CPUResourceValueNames),
  memoryRequests: z.enum(MemoryResourceNames),
  memoryLimits: z.enum(MemoryResourceNames),
}

const DeploymentEditFormSchema = {
  button: z.object(baseValidation),
  form: z
    .object({
      ...baseValidation,
      domainName: baseValidation.domainName
        .refine((domain) => !(domain.startsWith('http://') || domain.startsWith('https://')), {
          message: '도메인에 http 또는 https가 포함되어 있어요.',
        })
        .refine((domain) => regexes.hostname.test(domain), {
          message: '도메인 형식이 올바르지 않아요.',
        }),
      port: baseValidation.port
        .min(0, { message: '포트 번호가 올바르지 않아요.' })
        .max(65535, { message: '포트 번호가 올바르지 않아요.' }),
      message: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      const checkResourceReversed = <T extends string>(values: T[], request: T, limit: T) => {
        const requestIndex = values.indexOf(request)
        const limitIndex = values.indexOf(limit)
        return requestIndex > limitIndex
      }

      const addResourceIssue = (type: 'cpu' | 'memory', ctx: z.RefinementCtx) => {
        const cpuIssue = {
          message: 'CPU 요청 리소스는 제한 리소스보다 작거나 같아야 해요.',
          paths: ['cpuRequests', 'cpuLimits'],
        }
        const memoryIssue = {
          message: '메모리 요청 리소스는 제한 리소스보다 작거나 같아야 해요.',
          paths: ['memoryRequests', 'memoryLimits'],
        }

        const message = type === 'cpu' ? cpuIssue.message : memoryIssue.message
        const paths = type === 'cpu' ? cpuIssue.paths : memoryIssue.paths

        paths.forEach((path) => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message,
            path: [path],
          })
        })
      }

      if (checkResourceReversed(mutable(CPUResourceValueNames), data.cpuRequests, data.cpuLimits)) {
        addResourceIssue('cpu', ctx)
      }
      if (
        checkResourceReversed(mutable(MemoryResourceNames), data.memoryRequests, data.memoryLimits)
      ) {
        addResourceIssue('memory', ctx)
      }
    }),
}
