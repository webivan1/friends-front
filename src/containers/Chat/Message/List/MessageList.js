import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/es/Button/Button";
import { Close, Refresh, VolumeDown, VolumeMute } from "@material-ui/icons";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";
import List from "@material-ui/core/List/List";
import ArrowBack from '@material-ui/icons/ArrowBack';
import { messageListAction } from "@/store/actions/chat/messageListAction";
import MessageForm from "@/containers/Chat/Message/Form/MessageForm";
import styles from '@/containers/Chat/Message/List/styles'
import MessageItem from "@/containers/Chat/Message/Item/MessageItem";

@withStyles(styles)
@connect(
  state => ({
    ...state.messageList,
    user: state.user.user,
    lang: state.translate.locale
  }),
  dispatch => ({
    fetchModels: (url, append) => dispatch(messageListAction.fetchModels(url, append)),
    listen: id => dispatch(messageListAction.listenNewMessage(id)),
    clear: id => dispatch(messageListAction.clear(id)),
  })
)
export default class MessageList extends Component {

  static propTypes = {
    volume: PropTypes.bool.isRequired,
    chat: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
    onChangeVolume: PropTypes.func.isRequired,
    onCloseChat: PropTypes.func.isRequired,
  };

  refWrapper = null;
  autoScroll = true;

  fetch(append = true) {
    this.props.fetchModels(`/user/chat/${this.props.chat.id}/messages`, append);
  }

  componentWillMount() {
    this.props.listen(this.props.chat.id);

    if (this.props.loaderList) {
      this.fetch(false);
    }
  }

  componentWillUnmount() {
    this.props.clear(this.props.chat.id);
  }

  componentDidMount() {
    if (this.refWrapper) {
      this.refWrapper.onscroll = event => {
        this.refWrapper.scrollTop === 0 && this.oldMessages();
        this.autoScroll = this.isBottomScroll();
      }
    }

    this.toBottom();
  }

  oldMessages() {
    if (this.props.nextPageUrl) {
      this.props.fetchModels(this.props.nextPageUrl, true);
    }
  }

  toBottom() {
    this.refWrapper.scrollTop = this.refWrapper.scrollHeight;
  }

  isBottomScroll() {
    return this.calcBottom() === this.refWrapper.scrollHeight;
  }

  calcBottom() {
    return this.refWrapper.offsetHeight + this.refWrapper.scrollTop;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.autoScroll) {
      this.toBottom();
    }
  }

  handleRefresh() {
    this.fetch(false);
  }

  render() {
    const {
      classes, onCloseChat, onChangeVolume, onBack, volume,
      loaderList, models, user, lang
    } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.controls}>
          <div>
            <Button
              onClick={() => onBack()}
              color="secondary"
              size="small"
            >
              <ArrowBack />
            </Button>
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
        <div className={classes.items} ref={e => this.refWrapper = e}>
          <List component="nav">
            {models.map((item, index) => {
              return (
                <MessageItem
                  key={index}
                  yourMessage={+user.id === +item.user_id}
                  lang={lang}
                  {...item}
                />
              )
            })}
          </List>
        </div>
        <div className={classes.messageForm}>
          <MessageForm />
        </div>
      </div>
    )
  }
}