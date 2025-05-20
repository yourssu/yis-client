import { invert } from 'es-toolkit'
import { Suspense } from 'react'

import { Tab } from '@/components/Tab'
import { useSearchState } from '@/hooks/useSearchState'
import { useSetStateSelector } from '@/hooks/useSetStateSelector'
import { DeploymentStateList } from '@/routes/~_auth/~admin/components/DeploymentStateList'
import { DeploymentStateNames } from '@/types/deployment'
import { ValueOf } from '@/utils/type'

export const DeploymentStateTable = () => {
  const [search, setSearch] = useSearchState({
    from: '/_auth/admin/',
  })

  const setters = {
    id: useSetStateSelector(setSearch, 'id'),
  }

  const onTabChange = (tab: ValueOf<typeof TabStateNameMap>) => {
    const nextTab = invert(TabStateNameMap)[tab]
    setSearch(() => ({ id: undefined, tab: nextTab }))
  }

  return (
    <div className="w-full">
      <Tab
        defaultTab={TabStateNameMap[search.tab]}
        onTabChange={onTabChange}
        tabs={DeploymentStateNames.map((v) => TabStateNameMap[v])}
      >
        {({ tab }) => (
          <Suspense>
            <DeploymentStateList
              setActiveDeploymentId={setters.id}
              state={invert(TabStateNameMap)[tab]}
            />
          </Suspense>
        )}
      </Tab>
    </div>
  )
}

const TabStateNameMap = {
  REQUEST: '요청',
  APPROVAL: '승인',
  RETURN: '거절',
} as const
