import React, { Component } from 'react'
import Typography from "@material-ui/core/Typography";
import Container from '@/components/UI/Container/Container'

export default class About extends Component {
  render() {
    return (
      <Container>
        <Typography component="h1" variant="h4" gutterBottom>
          About
        </Typography>
      </Container>
    )
  }
}