import { applicationKey, userKey } from '@/apis/keys'
import {
  ApplicationPlaceholder,
  useCreateDeploymentMutation,
} from '@/components/CreateDeploymentFunnelStep/hooks/useCreateDeploymentMutation'
import { useSuspensedMe } from '@/hooks/useMe'
import { randomMeaninglessString } from '@/utils/random'
import { useQueryClient } from '@tanstack/react-query'

interface FillMockDeploymentData {
  application?: ApplicationPlaceholder
}

export const useFillMockDeploymentData = ({ application }: FillMockDeploymentData = {}) => {
  const mutateResult = useCreateDeploymentMutation()
  const qc = useQueryClient()
  const me = useSuspensedMe()

  const makeRandomUrl = () => {
    return `${encodeURIComponent(randomMeaninglessString(4))}.${randomMeaninglessString(6)}.com`
  }

  return async () => {
    await mutateResult({
      application: application ?? {
        name: `a${crypto.randomUUID()}`,
        description: '재판의 전심절차로서 행정심판을 할 수 있다.',
      },
      deployment: {
        domainName: makeRandomUrl(),
        port: 80,
        imageUrl: 'alexwhen/docker-2048:latest',
        message: '테스트 배포인데 승인해주세요.',
      },
      resource: {
        cpuRequests: '100m',
        cpuLimits: '100m',
        memoryRequests: '32Mi',
        memoryLimits: '32Mi',
      },
    })
    await qc.invalidateQueries({
      queryKey: application
        ? applicationKey.deployments(application.id)
        : userKey.applications(me.id),
    })
  }
}
