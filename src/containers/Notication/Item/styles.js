import * as colors from '@material-ui/core/colors';

const typeColors = {};

Object.keys(colors).forEach(key => {
  typeColors[key] = {
    backgroundColor: colors[key].main || colors[key][500],
    color: colors[key].contrastText || 'white',
  };

  typeColors[`${key}-button`] = {
    backgroundColor: colors[key][700],
    color: colors[key].A100 || colors[key][50],
  }
});

export default theme => ({
  ...typeColors,
  item: {
    marginBottom: '10px',
  }
})