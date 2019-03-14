import React, { Component } from 'react'
import {ThemeProvider} from 'react-jss'
import theme from './styles/defaultTheme'

export default class ThemeWrapper extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        {this.props.children}
      </ThemeProvider>
    )
  }
}
