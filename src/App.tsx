import { FC } from 'react'
import './App.css'
import * as stylex from '@stylexjs/stylex'
import { Map } from './components/map'
import { useSecretData } from './services/use-secret-data'

const App: FC = () => {
  const markers = useSecretData()

  return (
    <main {...stylex.props(styles.main)}>
      <Map markers={[...markers]} onClick={console.log} />
    </main>
  )
}

const styles = stylex.create({
  main: {
    width: '100vw',
    height: '100vh',
  },
})

export default App
