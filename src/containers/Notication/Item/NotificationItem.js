import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar/Avatar";
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import Close from '@material-ui/icons/Close';
import Card from "@material-ui/core/Card/Card";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import IconButton from "@material-ui/core/IconButton/IconButton";
import styles from '@/containers/Notication/Item/styles';

@withStyles(styles)
export default class NotificationItem extends Component {

  timer = null;

  static propTypes = {
    type: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onDestroy: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.startTimer();
  }

  startTimer() {
    this.timer = setTimeout(() => this.props.onDestroy(), 3500);
  }

  handleDestroy() {
    this.props.onDestroy()
  }

  handleEnter() {
    this.timer && clearTimeout(this.timer);
    this.timer = null;
  }

  handleLeave() {
    this.startTimer();
  }

  render() {
    const { classes, type, theme, message } = this.props;

    let style = [classes.item];
    let button = '';

    if (type) {
      button = classes[`${type}-button`];
      style.push(classes[type] || '');
    }

    return (
      <Card
        onMouseEnter={this.handleEnter.bind(this)}
        onMouseLeave={this.handleLeave.bind(this)}
        className={style.join(' ')}
      >
        <CardHeader
          className="py-10 px-10"
          avatar={
            <Avatar aria-label="Recipe" className={button}>
              <NotificationImportant />
            </Avatar>
          }
          action={
            <IconButton className={button} color="inherit" onClick={this.handleDestroy.bind(this)}>
              <Close />
            </IconButton>
          }
          title={theme}
          subheader={message}
        />
      </Card>
    )
  }
}

