import { FC } from 'react'
import './App.css'
import * as stylex from '@stylexjs/stylex'
import { Map } from './components/map'

const App: FC = () => {

  return (
    <main {...stylex.props(styles.main)}>
      <aside></aside>
      <Map
        markers={[
        ]}
        onClick={console.log}
      />
    </main>
  )
}

const styles = stylex.create({
  main: {
    display: 'grid',
    height: '100vh',
  },
})

export default App
