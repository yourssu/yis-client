import { tv } from 'tailwind-variants'

import { Table } from '@/components/Table'
import { ContentSection } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDetailCluster/ContentSection'
import { ApplicationClusterStatusType } from '@/types/application'

interface ClusterPodContentProps {
  clusterStatus: ApplicationClusterStatusType
}

const content = tv({
  slots: {
    ready: '',
    status: '',
  },
  variants: {
    ready: {
      true: {
        ready: 'text-green500',
      },
      false: {
        ready: 'text-grey500',
      },
    },
    status: {
      Running: {
        status: 'text-green500',
      },
      Pending: {
        status: 'text-orange500',
      },
      ContainerCreating: {
        status: 'text-orange500',
      },
      CrashLoopBackOff: {
        status: 'text-negative',
      },
      ImagePullBackOff: {
        status: 'text-negative',
      },
      Failed: {
        status: 'text-negative',
      },
      'Unknown-Status': {
        status: 'text-grey500',
      },
    },
  },
})

export const ClusterPodContent = ({ clusterStatus }: ClusterPodContentProps) => {
  const { ready, status } = content()
  const { pods } = clusterStatus

  return (
    <ContentSection description={`총 ${pods.length}개의 파드가 있어요.`} title="파드 현황">
      <Table>
        <Table.Head headers={['이름', '준비', '상태', '나이', '재시작 수']} />
        <Table.Body>
          {pods.map((pod, index) => (
            <Table.Row index={index} key={pod.name}>
              <Table.Cell className="font-medium">{pod.name}</Table.Cell>
              <Table.Cell className={ready({ ready: pod.ready })}>
                {pod.ready ? '준비 완료' : '준비 중'}
              </Table.Cell>
              <Table.Cell className={status({ status: pod.status })}>
                {PodStatusNameMap[pod.status]}
              </Table.Cell>
              <Table.Cell>{pod.age}</Table.Cell>
              <Table.Cell>{pod.restarts}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </ContentSection>
  )
}

const PodStatusNameMap = {
  Running: '작동 중',
  Pending: '대기 중',
  ContainerCreating: '컨테이너 생성 중',
  CrashLoopBackOff: '컨테이너 반복 충돌',
  ImagePullBackOff: '이미지 가져오기 실패',
  Failed: '실패',
  'Unknown-Status': '알 수 없음',
} as const satisfies Record<ApplicationClusterStatusType['pods'][number]['status'], string>
