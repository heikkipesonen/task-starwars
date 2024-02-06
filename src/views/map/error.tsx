import * as stylex from '@stylexjs/stylex'
import { FC } from 'react'

export const Error: FC = () => {
  return <div {...stylex.props(styles.base)}>Error :(</div>
}
const styles = stylex.create({  
  base: {
    backgroundColor: '#c37272',
  },
})
