import * as stylex from '@stylexjs/stylex'

export const containerStyles = stylex.create({
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
