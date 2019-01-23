import React from 'react';
import { Button as ButtonMaterial } from  '@material-ui/core';
import * as colors from '@material-ui/core/colors';
import { withStyles } from "@material-ui/core/styles";

const Button = ({ children, classes, typeColor, ...params }) => {

  let className = [];

  if (params.className) {
    className = [...className, ...params.className.split(' ')];
  }

  if (typeColor) {
    className.push(classes[typeColor || 'blue']);
  }

  return (
    <ButtonMaterial
      {...params}
      className={className.join(' ')}
    >
      {children}
    </ButtonMaterial>
  )
};

const colorsObject = {};

Object.keys(colors).forEach(key => {
  colorsObject[key] = {
    backgroundColor: colors[key].main || colors[key][500],
    color: colors[key].contrastText || 'white',
    '&:hover': {
      backgroundColor: colors[key].dark || colors[key][700],
    }
  };
});

export default withStyles(colorsObject)(Button);