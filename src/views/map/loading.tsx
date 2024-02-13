import * as stylex from '@stylexjs/stylex'
import { FC } from 'react'
import { viewStyles } from './styles'

export const Loading: FC = () => {
  return <div data-test-id="view__loading" {...stylex.props(viewStyles.base, viewStyles.textView, styles.loading)}>Loading...</div>
}

const styles = stylex.create({
  loading: {
    backgroundImage: 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)'
  },
})
