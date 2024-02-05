import { FC, useEffect, useState } from 'react'
import './App.css'
import mapboxgl from 'mapbox-gl'
import * as stylex from '@stylexjs/stylex'
import { Map } from './components/map'
import { remoteQuery } from './services/query'
import { EntityDetails, Location, LocationsResponse } from './domain/map'
import { base64decode } from './support/base64decode'
import { z } from 'zod'

const App: FC = () => {
  const [myPosition, setMyPosition] = useState<mapboxgl.Marker | null>(null)
  const [locations, setLocations] = useState<Location[]>([])
  const [entities, setEntities] = useState<EntityDetails[]>([])

  useEffect(() => {
    const { query, abort } = remoteQuery(
      'https://aseevia.github.io/star-wars-frontend/data/secret.json'
    )
    query
      .then(LocationsResponse.parse)
      .then((x) => x.message)
      .then(base64decode)
      .then(JSON.parse)
      .then(z.array(Location).parse)
      .then((x) => {
        setLocations(x)
        return x
      })
      .then((xs) => getEntities(xs.map((x) => x.id)))
      .then(setEntities)
      .catch(console.error)

    return () => abort()
  }, [])

  const handleMapClick = (e: mapboxgl.MapMouseEvent) =>
    setMyPosition((x) => {
      // a marker could be mutated, but this is the way #mandalorian
      if (x) {
        x.remove()
      }

      return new mapboxgl.Marker({ color: 'green' }).setLngLat(e.lngLat)
    })

  const markers = locations.map((x) =>
    new mapboxgl.Marker().setLngLat([x.long, x.lat])
  )

  console.log(entities)

  return (
    <main {...stylex.props(styles.main)}>
      <Map
        markers={[...markers, ...(myPosition ? [myPosition] : [])]}
        onClick={handleMapClick}
      />
    </main>
  )
}

const getEntities = (ids: (string | number)[]): Promise<EntityDetails[]> => {
  const queries = ids.map((x) =>
    remoteQuery(`https://akabab.github.io/starwars-api/api/id/${x}.json`)
  )
  return Promise.all(queries.map((x) => x.query)).then(
    z.array(EntityDetails).parse
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
