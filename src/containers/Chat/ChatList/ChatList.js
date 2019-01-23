import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Typography from "@material-ui/core/Typography/Typography";
import List from "@material-ui/core/List/List";
import Button from "@material-ui/core/es/Button/Button";
import { Close, Refresh, VolumeMute, VolumeDown } from "@material-ui/icons";
import Switch from "@material-ui/core/Switch/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Translate from "@/containers/Translate/Translate";
import { chatListAction } from "@/store/actions/chat/chatListAction";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import TimeAgo from 'react-time-ago/no-tooltip';
import styles from '@/containers/Chat/ChatList/styles';
import Badge from "@material-ui/core/es/Badge/Badge";
import IsOnlineUser from "@/containers/OnlineUser/IsOnlineUser";
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';

@withStyles(styles)
@connect(
  state => ({
    ...state.chatList,
    newMessage: state.chatNewMessage,
    user: state.user.user,
    lang: state.translate.locale
  }),
  dispatch => ({
    fetchModels: (url, append) => dispatch(chatListAction.fetchModels(url, {}, append)),
  })
)
export default class ChatList extends Component {

  static propTypes = {
    volume: PropTypes.bool.isRequired,
    onChangeVolume: PropTypes.func.isRequired,
    onCloseChat: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
  };

  fetch(append = true) {
    this.props.fetchModels('/user/chat/list', append);
  }

  componentWillMount() {
    if (this.props.loaderList) {
      this.fetch(false);
    }
  }

  handleRefresh() {
    this.fetch(false);
  }

  handleNextPage() {
    this.props.fetchModels(this.props.nextPageUrl, true);
  }

  noReadMessage(id) {
    const item = this.props.newMessage.detail.find(({ chat_id }) => +chat_id === +id);
    return item ? +item.no_read : 0;
  }

  render() {
    const {
      classes, volume, onChangeVolume, onCloseChat, onClick,
      models, loaderList, nextPageUrl, user, lang
    } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.controls}>
          <div>
            <Button
              onClick={() => onCloseChat()}
              color="secondary"
              size="small"
            >
              <Close />
            </Button>
            <Button
              disabled={loaderList}
              onClick={e => this.handleRefresh()}
              color="secondary"
              size="small"
            >
              <Refresh />
            </Button>
          </div>
          <div>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={volume}
                  onChange={e => onChangeVolume(e.target.checked)}
                />
              }
              labelPlacement="start"
              label={volume ? <VolumeDown /> : <VolumeMute />}
            />
          </div>
        </div>
        {/*<div className={classes.search}>*/}
          {/*<TextField*/}
            {/*disabled={loaderList}*/}
            {/*fullWidth*/}
            {/*placeholder="Search..."*/}
            {/*margin="normal"*/}
          {/*/>*/}
        {/*</div>*/}
        <div className={classes.items}>
          <List component="nav">
            {models.map((item, index) => {

              const [ friend ] = item.with_users.filter(({ user_id }) => +user_id !== +user.id);

              const AvatarUser = (
                friend.image ? (
                  <ListItemAvatar>
                    <IsOnlineUser userId={friend.user.id}>
                      <div className="online-user-detect-avatar">
                        <Avatar
                          alt={friend.user.name}
                          src={friend.image}
                        />
                      </div>
                    </IsOnlineUser>
                  </ListItemAvatar>
                ) : null
              );

              return (
                <ListItem
                  key={index}
                  button
                  onClick={e => onClick(item)}
                >
                  {AvatarUser}

                  <ListItemText
                    primary={friend.user.name}
                    secondary={
                      <React.Fragment>
                        {this.noReadMessage(item.id) > 0 ? (
                          <Badge badgeContent={this.noReadMessage(item.id)} color="primary">
                            <Typography className={classes.maxMessage} component="small" color="secondary">
                              {item.last_message}
                            </Typography>
                          </Badge>
                        ) : (
                          <Typography className={classes.maxMessage} component="small" color="secondary">
                            {item.last_message}
                          </Typography>
                        )}

                        <Typography component="small">
                          <Typography
                            component={TimeAgo}
                            locale={lang}
                            align="right"
                            color="secondary"
                          >
                            {item.time_update}
                          </Typography>
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              )
            })}
          </List>
        </div>
        {nextPageUrl ? (
          <div className={classes.loadMore}>
            {loaderList ? <CircularProgress color="primary" size="20" /> : (
              <Button onClick={e => this.handleNextPage()} color="primary">
                <Translate name="More" />
              </Button>
            )}
          </div>
        ) : null}
      </div>
    )
  }
}