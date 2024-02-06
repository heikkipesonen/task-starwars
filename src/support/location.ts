import distance from '@turf/distance'
import { point } from '@turf/helpers'

import { LocationDetails } from '../domain/location'
import { compareNumber } from './sort'

type LocationDetailsWithDistance = LocationDetails & { distance: number };
export const calcDistancesTo =
  (from: [number, number]) =>
  (locations: LocationDetails[]): LocationDetailsWithDistance[] =>
    locations.map((location) => {
      const fromPoint = point(from)
      const to = point([location.long, location.lat])
      return {
        ...location,
        distance: distance(fromPoint, to),
      }
    })


// fp-ts has ord but this is a simple case
export const sortLocationsByDistance = (locations: LocationDetailsWithDistance[]) =>
  locations.sort((a, b) => compareNumber(a.distance, b.distance))