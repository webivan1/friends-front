import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  loader: {
    position: 'fixed',
    zIndex: 9999,
    top: 0,
    left: 0,
    width: '100%'
  }
});

const Loader = ({ loader, classes }) => (
  <div className={classes.loader}>
    {loader ? <LinearProgress /> : null}
  </div>
);

export default withStyles(styles)(Loader);