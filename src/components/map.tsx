import * as stylex from '@stylexjs/stylex'
import mapboxgl from 'mapbox-gl'
import { FC, useEffect, useRef } from 'react'

import 'mapbox-gl/dist/mapbox-gl.css'

export const Map: FC<{
  markers: mapboxgl.Marker[];
  bounds: mapboxgl.LngLatBounds;
  onClick: (x: mapboxgl.MapMouseEvent) => void;
}> = ({ markers, bounds, onClick }) => {
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (map.current) return

    map.current = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/heikkipesonen/cls8uijn8019z01pldl2g437e',
      accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
      bounds
    })    
    map.current.on('click', onClick)
  }, [bounds, onClick])

  useEffect(() => {
    if (!map.current) return
    markers.forEach((x) => x.addTo(map.current!))

    return () => markers.forEach((x) => x.remove())
  }, [markers])

  return <div id="map" {...stylex.props(styles.map)}></div>
}

const styles = stylex.create({
  map: {
    gridArea: 'map',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
  },
})