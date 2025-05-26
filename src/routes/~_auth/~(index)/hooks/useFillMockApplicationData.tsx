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
    return `https://${encodeURIComponent(randomMeaninglessString(4))}.${randomMeaninglessString(6)}.com`
  }

  return async () => {
    await mutateResult({
      application: {
        name: `a${crypto.randomUUID()}`,
        description: '재판의 전심절차로서 행정심판을 할 수 있다.',
      },
      deployment: {
        domain: makeRandomUrl(),
        port: 80,
        imageUrl: 'alexwhen/docker-2048:latest2',
        message: '테스트 배포인데 승인해주세요.',
      },
      resource: {
        cpuRequest: '0.1 CPU',
        cpuLimit: '0.1 CPU',
        memoryRequest: '32Mi',
        memoryLimit: '32Mi',
      },
    })
    await qc.invalidateQueries({
      queryKey: userKey.applications(me.id),
    })
  }
}
