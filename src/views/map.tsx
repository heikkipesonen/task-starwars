import * as stylex from '@stylexjs/stylex'
import { FC, useState } from 'react'
import { Map } from '../components/map'
import mapboxgl from 'mapbox-gl'
import { LocationDetails } from '../domain/location'
import { LocationsList } from '../components/locations-list'

export const Success: FC<{ locations: LocationDetails[] }> = ({
  locations,
}) => {
  const [myPosition, setMyPosition] = useState<mapboxgl.Marker | null>(null)
  const markers = locations.map((x) =>
    new mapboxgl.Marker().setLngLat([x.long, x.lat])
  )

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

export const Loading: FC = () => {
  return <div {...stylex.props(styles.Loading)}>Loading...</div>
}

export const Error: FC = () => {
  return <div {...stylex.props(styles.Error)}>Error :(</div>
}

const styles = stylex.create({
  Container: {
    display: 'grid',
    gridTemplateColumns: 'auto 200px',
    gridTemplateRows: '1fr',
    gridTemplateAreas: '"map locations"',
    position: 'relative',
    width: '100vw',
    height: '100vh',
  },
  Map: {    
    gridArea: 'map',
    overflowY: 'scroll'
  },
  LocationList: {
    gridArea: 'locations',
    overflowY: 'scroll'
  },
  Loading: {
    backgroundColor: '#8295c6',
  },
  Error: {
    backgroundColor: '#c37272',
  },
})
