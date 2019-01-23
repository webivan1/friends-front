import React from 'react';
import { NavLink as BaseLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    '&.active': {
      color: blue[400]
    },
    '&:hover': {
      color: blue[400]
    }
  }
});

const NavLink = props => (
  <Button
    component={BaseLink}
    className={props.classes.button}
    to={props.to}
    exact={props.exact || false}
  >
    {props.children}
  </Button>
);

export default withStyles(styles)(NavLink);