import theme from './style.theme';

const styles = {
  '@global': {
    body: {
      ...theme.typography.body1,
    },
    a: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        color: 'inherit'//theme.palette.primary.light
      }
    }
  }
};

export default styles;