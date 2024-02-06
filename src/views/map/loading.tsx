import * as stylex from '@stylexjs/stylex'
import { FC } from 'react'
import { containerStyles } from './container'

export const Loading: FC = () => {
  return <div {...stylex.props(containerStyles.base, containerStyles.textView, styles.Loading)}>Loading...</div>
}

const styles = stylex.create({
  Loading: {
    backgroundImage: 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)'
  },
})
