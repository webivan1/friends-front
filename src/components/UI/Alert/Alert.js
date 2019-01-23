import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  alert: {
    padding: theme.spacing.unit * 2,
    // borderWidth: '1px',
    // borderStyle: 'solid',
    boxSizing: 'border-box',
    boxShadow: theme.boxShadow,
  },
  alertDanger: {
    background: `linear-gradient(45deg, ${theme.palette.error[700]} 30%, ${theme.palette.error[800]} 90%)`,
    // borderColor: theme.palette.error[800],
    color: theme.palette.error['A100']
  },
  alertSuccess: {
    background: `linear-gradient(45deg, ${theme.palette.success[400]} 30%, ${theme.palette.success[500]} 90%)`,
    // borderColor: theme.palette.success[500],
    color: theme.palette.success[900]
  },
  alertWarning: {
    background: `linear-gradient(45deg, ${theme.palette.primary[400]} 30%, ${theme.palette.primary[500]} 90%)`,
    // borderColor: theme.palette.primary[500],
    color: 'black'
  },
  alertInfo: {
    background: `linear-gradient(45deg, ${theme.palette.secondary[400]} 30%, ${theme.palette.secondary[500]} 90%)`,
    // borderColor: theme.palette.secondary[400],
    color: theme.palette.secondary[900]
  }
});

const Alert = ({ classes, type, className, ...props }) => (
  <div className={classNames(className, classes.alert, {
    [classes.alertDanger]: type === 'danger',
    [classes.alertSuccess]: type === 'success',
    [classes.alertWarning]: type === 'warning',
    [classes.alertInfo]: type === 'info',
  })}>
    {props.children}
  </div>
);

export default withStyles(styles)(Alert);