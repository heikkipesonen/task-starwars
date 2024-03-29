import { FC } from 'react'
import * as stylex from '@stylexjs/stylex'
import { LocationDetails } from '../../domain/location'
import { pipe } from 'fp-ts/lib/function'

import { ListContainer } from './list-container'
import { ListItem } from './list-item'
import {
  calcDistancesTo,
  sortLocationsByDistance,
} from '../../support/location'

export const LocationsList: FC<{
  locations: LocationDetails[];
  myLocation: [number, number];
  style: stylex.StyleXStyles;
}> = ({ locations, myLocation, style }) => {
  const sortedLocations = pipe(
    locations,
    calcDistancesTo(myLocation),
    sortLocationsByDistance
  )

  return (
    <ListContainer style={style}>
      {sortedLocations.map((location) => (
        <ListItem
          key={location.id}
          name={location.entity.name}
          image={location.entity.image}
          distance={location.distance}
        />
      ))}
    </ListContainer>
  )
}
