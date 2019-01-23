import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { initDetectAction } from "../../store/actions/mobile-detect/mobileDetectAction";

@withRouter
@connect(
  state => state.mobileDetect,
  dispatch => ({
    change: () => dispatch(initDetectAction())
  })
)
export default class MobileDetect extends Component {
  componentWillMount() {
    window.onresize = () => this.props.change();
  }

  render() {
    return this.props.children;
  }
}