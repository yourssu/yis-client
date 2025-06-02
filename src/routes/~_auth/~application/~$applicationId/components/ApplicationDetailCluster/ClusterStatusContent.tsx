import { MdChatBubble } from 'react-icons/md'
import { Separated } from 'react-simplikit'

import { Dialog } from '@/components/Dialog'
import { Divider } from '@/components/Divider'
import { InlineButton } from '@/components/InlineButton'
import { ItemList } from '@/components/ItemList'
import { Table } from '@/components/Table'
import { useAlertDialog } from '@/hooks/useAlertDialog'
import { ContentSection } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDetailCluster/ContentSection'
import { InfoCard } from '@/routes/~_auth/~application/~$applicationId/components/ApplicationDetailCluster/InfoCard'
import { ApplicationClusterStatusType } from '@/types/application'
import { formatTemplates } from '@/utils/date'

interface ClusterStatusContentProps {
  clusterStatus: ApplicationClusterStatusType
}

export const ClusterStatusContent = ({ clusterStatus }: ClusterStatusContentProps) => {
  const openReasonAlertDialog = useAlertDialog()

  const pairs = [
    {
      label: '이름',
      value: clusterStatus.name,
    },
    {
      label: '나이',
      value: clusterStatus.age,
    },
  ]

  const onClickReason = ({ message, reason }: { message: string; reason: string }) => {
    openReasonAlertDialog({
      closeButton: true,
      closeableWithOutside: true,
      title: reason,
      content: <Dialog.Content>{message}</Dialog.Content>,
    })
  }

  return (
    <div className="flex flex-col gap-16">
      <ContentSection title="클러스터 정보">
        <ItemList>
          <ItemList.Body>
            <Separated by={<Divider />}>
              {pairs.map((pair) => (
                <div className="px-2">
                  <ItemList.Item key={pair.label} label={pair.label}>
                    {pair.value}
                  </ItemList.Item>
                </div>
              ))}
            </Separated>
          </ItemList.Body>
        </ItemList>
      </ContentSection>

      <ContentSection title="레플리카">
        <div className="grid grid-cols-4 gap-2.5">
          <InfoCard label="총 개수">{clusterStatus.totalReplicas}</InfoCard>
          <InfoCard label="사용 가능">{clusterStatus.availableReplicas}</InfoCard>
          <InfoCard label="준비됨">{clusterStatus.readyReplicas}</InfoCard>
          <InfoCard label="업데이트됨">{clusterStatus.updatedReplicas}</InfoCard>
        </div>
      </ContentSection>

      <ContentSection title="클러스터 상태">
        <Table>
          <Table.Head headers={['유형', '상태', '원인', '변경 시각']} />
          {clusterStatus.conditions.map((condition, index) => (
            <Table.Row index={index} key={condition.type}>
              <Table.Cell className="font-medium">{condition.type}</Table.Cell>
              <Table.Cell>{condition.status}</Table.Cell>
              <Table.Cell className="text-blue500">
                <InlineButton
                  onClick={() =>
                    onClickReason({
                      message: condition.message,
                      reason: condition.reason,
                    })
                  }
                >
                  <div className="flex items-center gap-1">
                    <MdChatBubble className="size-3" />
                    {condition.reason}
                  </div>
                </InlineButton>
              </Table.Cell>
              <Table.Cell>{formatTemplates['24.01.01 23:00'](condition.lastUpdate)}</Table.Cell>
            </Table.Row>
          ))}
        </Table>
      </ContentSection>
    </div>
  )
}
