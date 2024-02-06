import * as stylex from '@stylexjs/stylex'
import { FC, useState } from 'react'
import { Map } from '../../components/map'
import mapboxgl from 'mapbox-gl'
import { LocationDetails } from '../../domain/location'
import { LocationsList } from '../../components/locations-list'

export const Success: FC<{ locations: LocationDetails[] }> = ({
  locations,
}) => {
  const [myPosition, setMyPosition] = useState<mapboxgl.Marker | null>(null)
  const markers = locations.map((x) =>
    new mapboxgl.Marker().setLngLat([x.long, x.lat])
  )
  const bounds = locations.reduce((p, c) => {
    const lngLat = new mapboxgl.LngLat(c.long, c.lat)
    return p.extend(lngLat)
  }, new mapboxgl.LngLatBounds())

  const handleMapClick = (e: mapboxgl.MapMouseEvent) =>
    setMyPosition((x) => {
      // a marker could be mutated, but <this is the way>
      if (x) {
        x.remove()
      }
      return new mapboxgl.Marker({ color: 'green' }).setLngLat(e.lngLat)
    })

  return (
    <div {...stylex.props(styles.Container)}>
      <Map
        {...stylex.props(styles.Map)}
        markers={[...markers, ...(myPosition ? [myPosition] : [])]}
        bounds={bounds}
        onClick={handleMapClick}
      />
      {myPosition ? (
        <LocationsList
          style={styles.LocationList}
          locations={locations}
          myLocation={[
            myPosition?.getLngLat().lng,
            myPosition?.getLngLat().lat,
          ]}
        />
      ) : null}
    </div>
  )
}

const styles = stylex.create({
  Container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
  },
  Map: {    
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  LocationList: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '0px',
    overflow: 'hidden',
  },

})