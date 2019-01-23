import React from 'react';
import { withStyles } from "@material-ui/core/styles";

const Heading = ({ component, size, classes, children, ...params }) => (
  React.createElement(component || 'h1', {
    ...params,
    className: classes[`heading-${size || 4}`]
  }, children)
);

export default withStyles(theme => ({
  'heading-1': theme.typography.h1,
  'heading-2': theme.typography.h2,
  'heading-3': theme.typography.h3,
  'heading-4': theme.typography.h4,
  'heading-5': theme.typography.h5,
  'heading-6': theme.typography.h6,
}))(Heading);