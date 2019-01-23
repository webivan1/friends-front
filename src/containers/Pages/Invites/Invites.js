import React, { Component } from 'react';
import Container from "../../../components/UI/Container/Container";
import { withStyles } from '@material-ui/core/styles';
import Translate from "../../Translate/Translate";
import Heading from "../../../components/UI/Heading/Heading";
import InviteList from "./InviteList";

@withStyles({})
export default class Invites extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Container>
        <Heading>
          <Translate name="Invite list" />
        </Heading>

        <InviteList />
      </Container>
    )
  }
}