import { z } from 'zod'
import { EntityDetails, Location, LocationDetails } from '../domain/location'
import { base64decode } from '../support/base64decode'
import { remoteQuery } from './query'

/**
 * just for simplicity, we're going to fetch the locations and entities in one go
 * @returns a promise that resolves to an array of LocationDetails
 */
export const fetchLocations = async (): Promise<LocationDetails[]> => {
  const locations = await remoteQuery(
    'https://aseevia.github.io/star-wars-frontend/data/secret.json'
  )
    .then(LocationsResponse.parse)
    .then((x) => x.message)
    .then(base64decode)
    .then(JSON.parse)
    .then(z.array(Location).parse)

  const entities = await Promise.all(
    locations.map((location) =>
      remoteQuery(
        `https://akabab.github.io/starwars-api/api/id/${location.id}.json`
      )
    )
  )
  .then(z.array(EntityDetails).parse)

  return mapToDomain(locations)(entities)
}

const LocationsResponse = z.object({
  message: z.string(),
})

const mapToDomain = (locations: Location[]) => (entities: EntityDetails[]) =>
  locations.map((location) =>
    // lets just parse this with zod to make sure it's all good
    // and avoid null checks in the UI
    LocationDetails.parse({
      ...location,
      entity: entities.find((entity) => entity.id === location.id),
    })
  )
