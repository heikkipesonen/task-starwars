import { FC, useState } from 'react'
import './App.css'
import mapboxgl from 'mapbox-gl'
import * as stylex from '@stylexjs/stylex'
import { Map } from './components/map'
import { useSecretData } from './services/use-secret-data'

const App: FC = () => {
  const [myPosition, setMyPosition] = useState<mapboxgl.Marker | null>(null)
  const markers = useSecretData()

  const handleMapClick = (e: mapboxgl.MapMouseEvent) => 
    setMyPosition((x) => {      
      // a marker could be mutated, but this is the way #mandalorian
      if (x) {
        x.remove()
      }

      return new mapboxgl.Marker({ color: 'green' }).setLngLat(e.lngLat)
    })
  

  return (
    <main {...stylex.props(styles.main)}>
      <Map
        markers={[...markers, ...(myPosition ? [myPosition] : [])]}
        onClick={handleMapClick}
      />
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
