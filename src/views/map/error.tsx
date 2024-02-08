import * as stylex from '@stylexjs/stylex'
import { FC } from 'react'

import { viewStyles } from './styles'

export const Error: FC = () => {
  return <div {...stylex.props(viewStyles.base, viewStyles.textView, styles.base)}>Error :(</div>
}
const styles = stylex.create({  
  base: {
    backgroundImage: 'linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)'
  },
})
