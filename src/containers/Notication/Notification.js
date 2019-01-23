import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { notificationAction } from '@/store/actions/notification/notificationAction';
import NotificationItem from '@/containers/Notication/Item/NotificationItem';
import styles from '@/containers/Notication/styles';

@withStyles(styles)
@connect(
  state => ({ notify: state.notification }),
  dispatch => ({
    remove: notify => dispatch(notificationAction.remove(notify)),
    listen: () => dispatch(notificationAction.listen()),
  })
)
export default class Notification extends Component {

  componentWillMount() {
    this.props.listen();
  }

  handleDestroy(notify) {
    this.props.remove(notify);
  }

  render() {
    const { classes, notify } = this.props;

    return (
      <div className={classes.wrapper}>
        {notify.messages.reverse().map((notify, index) =>
          <NotificationItem
            key={index}
            {...notify}
            onDestroy={() => this.handleDestroy(notify)}
          />
        )}
      </div>
    );
  }
}