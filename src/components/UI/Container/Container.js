import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1150 + theme.spacing.unit * 3 * 2)]: {
      width: 1150,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }
});

const Container = props => {
  const { classes } = props;

  return (
    <div className={classes.layout}>
      {props.children}
    </div>
  )
};

export default withStyles(styles)(Container)