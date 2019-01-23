import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from "../../../components/UI/Container/Container";
import { NavLink, withRouter } from 'react-router-dom';
import { Paper, Tab, Tabs } from "@material-ui/core/es/index";
import Translate from "../../Translate/Translate";

const links = [
  {
    label: 'Information',
    path: 'profile',
    exact: true
  },
  {
    label: 'Gallery',
    path: 'profile/gallery'
  },
  {
    label: 'Location',
    path: 'profile/location'
  },
  {
    label: 'My games',
    path: 'profile/games'
  },
];

@withRouter
@connect(
  state => state.translate
)
export default class Profile extends Component {
  state = {
    value: 0
  };

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({ value: this.props.location.state.value });
    }
  }

  render() {
    return (
      <Container>
        <Paper>
          <Tabs
            className="mb-25"
            value={this.state.value}
            indicatorColor="primary"
            textColor="primary"
          >
            {links.map((link, index) => {
              return (
                <Tab
                  key={index}
                  label={<Translate>{link.label}</Translate>}
                  component={NavLink}
                  to={{
                    pathname: `/${this.props.locale}/${link.path}`,
                    state: { value: index }
                  }}
                />
              )
            })}
          </Tabs>
        </Paper>

        {this.props.children}
      </Container>
    )
  }
}