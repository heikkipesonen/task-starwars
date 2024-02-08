import * as stylex from '@stylexjs/stylex'

export const viewStyles = stylex.create({
  base: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
  },
  textView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '4rem',
  }
})
