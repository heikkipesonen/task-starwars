import { FC, useEffect } from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl';
import * as stylex from '@stylexjs/stylex';

const App:FC = () => {
  useEffect(() => { 
     const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/heikkipesonen/cls8uijn8019z01pldl2g437e',
      center: [-74.5, 40],
      zoom: 9,
      accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
    });

    return () => map.remove()
  },  [])
  return (
    <main {...stylex.props(styles.main)}>
      <aside></aside>
      <div id="map" {...stylex.props(styles.map)}></div>
    </main>
  )
}

const styles = stylex.create({
  main: {
    display:'grid',
    gridTemplateAreas: `'aside map'`,
    gridTemplateColumns: '1fr 2fr',
    height: '100vh',
  },
  map: {
    gridArea: 'map',
    width: '100%',
    overflow: 'hidden'
  },
});

export default App
