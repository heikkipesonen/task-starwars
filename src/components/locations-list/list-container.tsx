import { FC, PropsWithChildren } from 'react'
import * as stylex from '@stylexjs/stylex'

export const ListContainer: FC<
  PropsWithChildren & { style?: stylex.StyleXStyles }
> = ({ children, style }) => (
  <ul {...stylex.props(styles.base, style)}>{children}</ul>
)
const styles = stylex.create({
  base: {
    padding: '1em',
    display: 'flex',
    flexDirection: 'row',
    fontSize: '1rem',
    gap: '1em',
    flexWrap: 'wrap',
  },
})