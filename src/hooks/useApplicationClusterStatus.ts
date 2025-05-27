import { ApplicationClusterPodType, ApplicationClusterStatusType } from '@/types/application'

export type ClusterStatusSummary =
  | '배포 성공'
  | '배포 실패'
  | '배포 중'
  | '승인 대기 중'
  | '초기화 중'

const PodFailureNames: Array<ApplicationClusterPodType['status']> = [
  'CrashLoopBackOff',
  'Failed',
  'ImagePullBackOff',
]

const PodPendingOrCreatingNames: Array<ApplicationClusterPodType['status']> = [
  'ContainerCreating',
  'Pending',
  'Unknown-Status',
]

const getPodStatusCases = (pods: ApplicationClusterPodType[]) => {
  const allPodsReady = pods.every((pod) => pod.status === 'Running' && pod.ready)
  const somePodsUnready = pods.some((pod) => pod.status === 'Running' && !pod.ready)
  const hasPodFailure = pods.some((pod) => PodFailureNames.includes(pod.status))
  const allPodsPendingOrCreating = pods.every((pod) =>
    PodPendingOrCreatingNames.includes(pod.status)
  )

  return {
    hasPodFailure,
    allPodsPendingOrCreating,
    allPodsReady,
    somePodsUnready,
  }
}

const getClusterStatusSummary = (
  clusterStatus: ApplicationClusterStatusType | undefined
): ClusterStatusSummary => {
  if (!clusterStatus) {
    return '승인 대기 중'
  }

  const { conditions, pods } = clusterStatus

  const progressing = conditions.find((c) => c.type === 'Progressing')
  const available = conditions.find((c) => c.type === 'Available')

  if (!progressing || !available) {
    return '배포 실패'
  }

  const { allPodsPendingOrCreating, allPodsReady, hasPodFailure, somePodsUnready } =
    getPodStatusCases(pods)

  if (progressing.status === 'False' && progressing.reason === 'ProgressDeadlineExceeded') {
    return '배포 실패'
  }

  if (hasPodFailure) {
    return '배포 실패'
  }

  if (allPodsPendingOrCreating) {
    return '초기화 중'
  }

  if (progressing.status === 'True' && available.status === 'True' && allPodsReady) {
    return '배포 성공'
  }

  if (somePodsUnready || progressing.status === 'True') {
    return '배포 중'
  }

  return '배포 중'
}

export const useApplicationClusterStatus = (
  clusterStatus: ApplicationClusterStatusType | undefined
) => {
  return {
    summary: getClusterStatusSummary(clusterStatus),
    runningPodCount: clusterStatus
      ? clusterStatus.pods.filter((pod) => pod.status === 'Running' && pod.ready).length
      : 0,
  }
}
