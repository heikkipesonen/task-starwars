import { FC } from 'react'
import * as stylex from '@stylexjs/stylex'
import * as format from '../../support/format'

export const ListItem: FC<{
  distance: number;
  name: string;
  image: string;
}> = ({ name, image, distance }) => {
  return (
    <li {...stylex.props(listItemStyles.base)}>
      <div {...stylex.props(imageContainerStyles.base)}>
        <img {...stylex.props(avatarImageStyles.base)} src={image} alt={name} />
      </div>
      <div {...stylex.props(textContainerStyles.base)}>
        <div>{name}</div>
        <div>{format.distance(distance)}</div>
      </div>
    </li>
  )
}

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

const listItemStyles = stylex.create({
  base: {
    padding: '4px',
    borderRadius: '32px',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.955)',
    color: 'black',
    boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.3)',
  },
})
