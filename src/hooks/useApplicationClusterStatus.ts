import { ApplicationClusterPodType } from '@/types/application'

export type ClusterStatus = 'failed' | 'inDeployment' | 'noPods' | 'running'

const getPodStatusSummary = (pod: ApplicationClusterPodType): ClusterStatus => {
  if (pod.status === 'Running' && pod.ready) {
    return 'running'
  }
  if (pod.status === 'ContainerCreating' && !pod.ready) {
    return 'inDeployment'
  }
  return 'failed'
}

export const useApplicationClusterStatus = (pods: ApplicationClusterPodType[]) => {
  const allPodStatus = pods.map((pod) => getPodStatusSummary(pod))
  const statusCounts = {
    running: allPodStatus.filter((status) => status === 'running').length,
    inDeployment: allPodStatus.filter((status) => status === 'inDeployment').length,
    failed: allPodStatus.filter((status) => status === 'failed').length,
  }

  return {
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
