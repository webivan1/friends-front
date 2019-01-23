import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const ListItem = ({ label, value, classes }) => (
  <li className={classes.item}>
    <div className={classes.label}>{label}</div>
    <div className={classes.dotted} />
    <div className={classes.value}>{value}</div>
  </li>
);

export default withStyles(theme => ({
  item: {
    marginBottom: theme.spacing.unit * 2,
    alignItems: 'flex-end !important',
    display: 'flex',
    flexWrap: 'wrap'
  },
  dotted: {
    flexBasis: 0,
    flexGrow: 1,
    maxWidth: '100%',
    borderBottom: `1px dotted ${theme.palette.grey["500"]}`,
    marginBottom: '7px',
    opacity: '.5'
  },
  label: {
    flex: '0 0 auto',
    width: 'auto',
    maxWidth: 'none',
    paddingRight: '5px',
    color: theme.palette.grey["400"]
  },
  value: {
    flex: '0 0 auto',
    width: 'auto',
    maxWidth: 'none',
    paddingLeft: '5px'
  }
}))(ListItem);