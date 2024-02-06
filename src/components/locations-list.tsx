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
  <div {...stylex.props(style)}>
    <ul {...stylex.props(listContainerStyles.base)}>
      {/**
       * could and should be extracted out of render, but #yolo.... works for now
       */}
      {pipe(
        locations,
        mapWithDistances(myLocation),
        sortLocationsByDistance
      ).map((location) => (
        <li key={location.id} {...stylex.props(listItemStyles.base)}>
          <div {...stylex.props(imageContainerStyles.base)}>
            <img
              {...stylex.props(avatarImageStyles.base)}
              src={location.entity.image}
              alt={location.entity.name}
            />
          </div>
          <div {...stylex.props(textContainerStyles.base)}>
            <div>{location.entity.name}</div>
            <div>{format.distance(location.distance)}</div>
          </div>
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

const listContainerStyles = stylex.create({
  base: {
    padding: '1em',
    display: 'flex',
    flexDirection: 'row',
    fontSize: '1rem',
    gap: '1em',
    flexWrap: 'wrap',
  },
})
const listItemStyles = stylex.create({
  base: {
    padding: '4px',
    borderRadius: '32px',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.955)',
    color: 'black',
    fontFamily: 'monospace',
    boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.3)',
  },
})

const textContainerStyles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '1em',
    marginRight: '1em',
  },
})

const imageContainerStyles = stylex.create({
  base: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    overflow: 'hidden',
    objectFit: 'cover',
  },
})

const avatarImageStyles = stylex.create({
  base: {
    width: '100%',
    objectFit: 'cover',
  },
})
