import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { onlineUserAction } from '@/store/actions/user/onlineUserAction'

@connect(
  state => state.onlineUser,
  dispatch => ({
    register: userId => dispatch(onlineUserAction.register(userId))
  })
)
export default class IsOnlineUser extends Component {

  static propTypes = {
    userId: PropTypes.number.isRequired
  };

  ref = null;

  componentDidMount() {
    this.listenUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId !== this.props.userId) {
      this.listenUser(nextProps.userId);
    }
  }

  getUser(userId) {
    return this.props.collection.getModelByUser(userId);
  }

  listenUser(userId = null) {
    userId = userId || this.props.userId;

    let model = this.getUser(userId);

    if (!model) {
      model = this.props.register(userId);
    }

    this.ref.setAttribute('user-id', userId);

    this.changeStateUser(userId, model.isOnline());

    model.onChangeStatus((user, status) => this.changeStateUser(user, status));
  }

  changeStateUser(userId, status) {
    if (this.ref && +this.ref.getAttribute('user-id') !== +userId) {
      return false;
    }

    const elem = this.ref ? this.ref.firstChild : null;

    if (elem) {
      status
        ? elem.classList.add('active')
        : elem.classList.remove('active');
    }
  }

  render() {
    return (
      <span ref={element => this.ref = element}>
        {this.props.children || ''}
      </span>
    )
  }
}