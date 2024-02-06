import { FC } from 'react'
import * as stylex from '@stylexjs/stylex'
import { LocationDetails } from '../domain/location'
import distance from '@turf/distance'
import { point } from '@turf/helpers'
import { pipe } from 'fp-ts/lib/function'

import * as format from '../support/format'
import { compareNumber } from '../support/sort'

export const LocationsList: FC<{
  locations: LocationDetails[];
  myLocation: [number, number];
  style: stylex.StyleXStyles;
}> = ({ locations, myLocation, style }) => (
  <div {...stylex.props(style, styles.Container)}>
    <ul {...stylex.props(styles.List)}>
      {pipe(
        locations,
        mapWithDistances(myLocation),
        sortLocationsByDistance
      ).map((location) => (
        <li key={location.id} {...stylex.props(styles.Item)}>
          <div {...stylex.props(styles.ImageContainer)}>
            <img
              {...stylex.props(styles.AvatarImage)}
              src={location.entity.image}
              alt={location.entity.name}
            />
          </div>
          <div>{location.entity.name}</div>
          <div>{format.distance(location.distance)}</div>
        </li>
      ))}
    </ul>
  </div>
)

type LocationDetailsWithDistance = LocationDetails & { distance: number };
const mapWithDistances =
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
const sortLocationsByDistance = (locations: LocationDetailsWithDistance[]) =>
  locations.sort((a, b) => compareNumber(a.distance, b.distance))

const styles = stylex.create({
  Container: {
    position: 'relative',
  },
  List: {
    padding: '1em',
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
  },
  Item: {
    display: 'flex',
    flexDirection: 'column',
  },
  ImageContainer: {
    position: 'relative',
    height: '0',
    paddingBottom: '100%',
    overflow: 'hidden',
    borderRadius: '50%',
  },
  AvatarImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    objectFit: 'cover',
  },
})
