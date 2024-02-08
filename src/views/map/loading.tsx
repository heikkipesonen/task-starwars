import * as stylex from '@stylexjs/stylex'
import { FC } from 'react'
import { viewStyles } from './styles'

export const Loading: FC = () => {
  return <div {...stylex.props(viewStyles.base, viewStyles.textView, styles.Loading)}>Loading...</div>
}

const styles = stylex.create({
  Loading: {
    backgroundImage: 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)'
  },
})
