import React, { Component } from 'react'
import { MuiThemeProvider, withStyles, createGenerateClassName, jssPreset } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import { create } from 'jss'

import theme from './style.theme'
import styles from './style'

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());

@withStyles(styles)
export default class Layout extends Component {
  render() {
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {this.props.children}
        </MuiThemeProvider>
      </JssProvider>
    )
  }
}