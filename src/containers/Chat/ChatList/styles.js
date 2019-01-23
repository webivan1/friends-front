export default theme => ({
  wrapper: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    alignItems: 'flex-start',
    minWidth: '320px'
  },
  controls: {
    flex: '0 0 auto',
    display: 'flex',
    paddingRight: `${theme.spacing.unit * 2}px`,
    height: 'auto',
    width: '100%',
    justifyContent: 'space-between',
    '& > div': {
      display: 'inline-flex',
    },
    '& svg': {
      position: 'relative',
      top: '2px',
      color: theme.palette.secondary.main
    },
    '& label': {
      position: 'relative',
      top: '3px'
    }
  },
  search: {
    flex: '0 0 auto',
    height: 'auto',
    width: '100%',
    '& input': {
      paddingLeft: `${theme.spacing.unit}px`,
      paddingRight: `${theme.spacing.unit}px`
    }
  },
  loadMore: {
    flex: '0 0 auto',
    height: 'auto',
    textAlign: 'center',
    width: '100%',
    padding: `${theme.spacing.unit}px`
  },
  items: {
    flexBasis: 0,
    flexGrow: 1,
    overflowY: 'auto',
    width: '100%',
  },
  maxMessage: {
    maxWidth: '300px'
  }
})