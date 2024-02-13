import { FC } from 'react'
import * as stylex from '@stylexjs/stylex'
import * as format from '../../support/format'

export const ListItem: FC<{
  distance: number;
  name: string;
  image: string;
}> = ({ name, image, distance }) => {
  return (
    <li {...stylex.props(listStyles.listItem)} data-test-id="locations-list__item">
      <div {...stylex.props(listStyles.imageContainer)}>
        <img {...stylex.props(listStyles.avatarImage)} src={image} alt={name} data-test-id="locations-list__item__image"/>
      </div>
      <div {...stylex.props(listStyles.textContainer)}>
        <div {...stylex.props(listStyles.nameLabel)} data-test-id="locations-list__item__name">{name}</div>
        <div {...stylex.props(listStyles.distanceLabel)} data-test-id="locations-list__item__distance">{format.distance(distance)}</div>
      </div>
    </li>
  )
}

const listStyles = stylex.create({
  listItem: {
    padding: '0.5em',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    color: 'black',
    boxShadow: '0 0 20px 0px rgba(0, 0, 0, 0.3)',
    borderRadius: '8px',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '1em',
    marginRight: '1em',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  nameLabel: {
    color: '#ca0e0e',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

  },
  distanceLabel: {
    fontWeight: 'bold',
  },
  imageContainer: {
    overflow: 'hidden',
    objectFit: 'cover',
    borderRadius: '50%',
    width: '52px',
    height: '52px',
    flexShrink: 0,
    position: 'relative', 
  },
  avatarImage: {
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0, 
    bottom: 0,
    filter: 'grayscale(100%)',
    objectFit: 'contain',
    width: '100%',
  },
})
