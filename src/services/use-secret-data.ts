import { useEffect, useState } from 'react'
import { remoteQuery } from './query'
import { Location, LocationsResponse } from '../domain/map'
import { base64decode } from '../support/base64decode'
import mapboxgl from 'mapbox-gl'
import { z } from 'zod'

export const useSecretData = (): mapboxgl.Marker[] => {
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([])

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
      .then((xs) =>
        xs.map((x) =>
          new mapboxgl.Marker({ color: 'red' }).setLngLat([x.long, x.lat])
        )
      )
      .then(setMarkers)
      .catch(() => {})

    return () => abort()
  }, [])

  return markers
}