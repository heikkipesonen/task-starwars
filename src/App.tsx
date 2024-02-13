import { FC, Suspense } from 'react'
import './index.css'
import * as stylex from '@stylexjs/stylex'

import { MapView } from './views/map'
import { ErrorBoundary } from 'react-error-boundary'
import { useQuery } from 'react-query'
import { fetchLocations } from './services/fetch-locations'

const App: FC = () => {
  return (
    <main {...stylex.props(styles.container)}>
      <ErrorBoundary FallbackComponent={MapView.Error}>
        <Suspense fallback={<MapView.Loading />}>
          <MapViewContainer />
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}

// maybe this should be stored in views/map but works for now...
const MapViewContainer: FC = () => {
  const { data }  = useQuery('locations', fetchLocations)
  return <MapView.Success locations={data || []} />
}

const styles = stylex.create({
  container: {
    fontFamily: 'monospace',
    width: '100vw',
    height: '100vh',
    position: 'relative',
  },
})

export default App
