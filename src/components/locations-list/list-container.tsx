import { FC, PropsWithChildren } from 'react'
import * as stylex from '@stylexjs/stylex'

export const ListContainer: FC<
  PropsWithChildren & { style?: stylex.StyleXStyles }
> = ({ children, style }) => (
  <ul {...stylex.props(styles.listContainer, style)}  data-test-id="locations-list">{children}</ul>
)
const styles = stylex.create({
  listContainer: {
    width: '300px',
    padding: '1em',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1rem',
    gap: '1em',
  },
})