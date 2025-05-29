import { userKey } from '@/apis/keys'
import { useSuspensedMe } from '@/hooks/useMe'
import { useCreateFirstDeploymentMutation } from '@/routes/~_auth/~(index)/hooks/useCreateFirstDeploymentMutation'
import { randomMeaninglessString } from '@/utils/random'
import { useQueryClient } from '@tanstack/react-query'

export const useFillMockApplicationData = () => {
  const mutateResult = useCreateFirstDeploymentMutation()
  const qc = useQueryClient()
  const me = useSuspensedMe()

  const makeRandomUrl = () => {
    return `${encodeURIComponent(randomMeaninglessString(4))}.${randomMeaninglessString(6)}.com`
  }

  return async () => {
    await mutateResult({
      application: {
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
      queryKey: userKey.applications(me.id),
    })
  }
}
