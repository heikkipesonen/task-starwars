import { FC } from 'react'
import './App.css'
import * as stylex from '@stylexjs/stylex'

import * as R from './support/remote-data'
import * as MapView from './views/map'
import { fetchLocations } from './services/fetch-locations'
import { pipe } from 'fp-ts/lib/function'

const App: FC = () => {
  const data = R.usePromise(fetchLocations)

  return (
    <main {...stylex.props(styles.main)}>
      {pipe(
        data,
        R.fold(
          () => null,
          () => <MapView.Error />,
          () => <MapView.Loading />,
          (x) => <MapView.Success locations={x} />
        )
      )}
    </main>
  )
}

const styles = stylex.create({
  main: {
    width: '100vw',
    height: '100vh',
    position: 'relative',
  },
})

export default App
