import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const List = ({ classes, children }) => (
  <ul className={classes.list}>
    {children}
  </ul>
);

export default withStyles(theme => ({
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    maxWidth: '500px',
  }
}))(List);