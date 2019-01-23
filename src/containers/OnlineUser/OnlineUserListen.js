import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onlineUserAction } from "@/store/actions/user/onlineUserAction";

@connect(
  state => ({ ...state.onlineUser, auth: !state.user.isGuest }),
  dispatch => ({
    live: () => dispatch(onlineUserAction.live())
  })
)
export default class OnlineUserListen extends Component {

  // loader = false;

  componentDidMount() {
    window.onmousemove = () => {
      console.log('TIME', this.props.nextTimeUpdate, (new Date).getTime() > this.props.nextTimeUpdate);
      console.log('AUTH', this.props.auth);
      console.log('LOADER', this.loader);

      if ((new Date).getTime() > this.props.nextTimeUpdate && this.props.auth && !this.loader) {
        // console.log('FETCH PING...');
        // this.loader = true;
        // this.props.live().then(() => this.loader = false);
      }
    }
  }

  render() {
    return null;
  }
}