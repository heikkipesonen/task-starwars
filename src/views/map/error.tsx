import * as stylex from '@stylexjs/stylex'
import { FC } from 'react'

import { viewStyles } from './styles'

export const Error: FC = () => {
  return <div  data-test-id="view__error" {...stylex.props(viewStyles.base, viewStyles.textView, styles.error)}>Error :(</div>
}
const styles = stylex.create({  
  error: {
    backgroundImage: 'linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)'
  },
})
