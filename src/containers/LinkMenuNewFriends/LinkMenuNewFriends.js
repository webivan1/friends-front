import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import Badge from "@material-ui/core/Badge/Badge";
import NotificationImportant from "@material-ui/icons/NotificationImportant";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {
  getRequests,
  listenNewRequests,
  unsubscribeNewRequests
} from "@/store/actions/friends/requests/friendsNewRequestsAction";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

@withRouter
@connect(
  state => ({ locale: state.translate.locale, ...state.friendsNewRequests }),
  dispatch => ({
    getRequests: () => dispatch(getRequests()),
    requestListener: () => dispatch(listenNewRequests()),
  })
)
export default class LinkMenuNewFriends extends Component {
  componentWillMount() {
    this.props.requestListener();
    this.props.getRequests();
  }

  componentWillUnmount() {
    unsubscribeNewRequests()
  }

  render() {
    if (this.props.loader) {
      return (
        <CircularProgress
          variant="indeterminate"
          disableShrink
          size={24}
          thickness={4}
        />
      )
    }

    return (
      <IconButton
        color="inherit"
        component={Link}
        to={`/${this.props.locale}/invites`}
      >
        {this.props.total > 0 ? (
          <Badge badgeContent={this.props.total} color="primary">
            <NotificationImportant />
          </Badge>
        ) : (
          <NotificationImportant />
        )}
      </IconButton>
    )
  }
}