import { getApplicationClusterStatus } from '@/apis/application'
import { applicationKey } from '@/apis/keys'
import { ApplicationClusterStatusType } from '@/types/application'
import { useSuspenseQuery } from '@tanstack/react-query'

type PodType = ApplicationClusterStatusType['pods'][number]
export type ClusterStatus = 'failed' | 'inDeployment' | 'noPods' | 'running'

const getPodStatusSummary = (pod: PodType): ClusterStatus => {
  if (pod.status === 'Running' && pod.ready) {
    return 'running'
  }
  if (pod.status === 'ContainerCreating' && !pod.ready) {
    return 'inDeployment'
  }
  return 'failed'
}

export const useApplicationClusterStatus = (applicationId: number) => {
  const { data } = useSuspenseQuery({
    queryKey: applicationKey.cluster(applicationId),
    queryFn: () => getApplicationClusterStatus(applicationId),
  })

  const { pods } = data
  const allPodStatus = pods.map((pod) => getPodStatusSummary(pod))
  const statusCounts = {
    running: allPodStatus.filter((status) => status === 'running').length,
    inDeployment: allPodStatus.filter((status) => status === 'inDeployment').length,
    failed: allPodStatus.filter((status) => status === 'failed').length,
  }

  return {
    pods,
    summary: ((): ClusterStatus => {
      if (pods.length === 0) {
        return 'noPods'
      }
      if (statusCounts.running === pods.length) {
        return 'running'
      }
      if (statusCounts.failed > 0) {
        return 'failed'
      }
      return 'inDeployment'
    })(),
    statusMap: Object.fromEntries(pods.map((pod) => [pod.name, getPodStatusSummary(pod)])),
    statusCounts,
  }
}
