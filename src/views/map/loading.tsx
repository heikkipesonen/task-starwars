import * as stylex from '@stylexjs/stylex'
import { FC } from 'react'

export const Loading: FC = () => {
  return <div {...stylex.props(styles.Loading)}>Loading...</div>
}

const styles = stylex.create({
  Loading: {
    backgroundColor: '#72c3c3',
  },
})
