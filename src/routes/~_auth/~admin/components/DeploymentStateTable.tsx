import { invert } from 'es-toolkit'
import { Suspense } from 'react'

import { Tab } from '@/components/Tab'
import { useSearchState } from '@/hooks/useSearchState'
import { useSetStateSelector } from '@/hooks/useSetStateSelector'
import { DeploymentStateList } from '@/routes/~_auth/~admin/components/DeploymentStateList'
import { DeploymentStateKRNameMap, DeploymentStateNames } from '@/types/deployment'
import { ValueOf } from '@/utils/type'

export const DeploymentStateTable = () => {
  const [search, setSearch] = useSearchState({
    from: '/_auth/admin/',
  })

  const setters = {
    id: useSetStateSelector(setSearch, 'id'),
  }

  const onTabChange = (tab: ValueOf<typeof DeploymentStateKRNameMap>) => {
    const nextTab = invert(DeploymentStateKRNameMap)[tab]
    setSearch(() => ({ id: undefined, tab: nextTab }))
  }

  return (
    <div className="w-full">
      <Tab
        defaultTab={DeploymentStateKRNameMap[search.tab]}
        onTabChange={onTabChange}
        tabs={DeploymentStateNames.map((v) => DeploymentStateKRNameMap[v])}
      >
        {({ tab }) => (
          <Suspense>
            <DeploymentStateList
              setActiveDeploymentId={setters.id}
              state={invert(DeploymentStateKRNameMap)[tab]}
            />
          </Suspense>
        )}
      </Tab>
    </div>
  )
}
