import React, { Component } from 'react';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer/Drawer';
import { Chat as ChatIcon } from '@material-ui/icons';
import Button from '@material-ui/core/Button/Button';
import { chatAction } from '@/store/actions/chat/chatAction';
import { withStyles } from '@material-ui/core/styles';
import styles from '@/containers/Chat/styles';
import ChatList from '@/containers/Chat/ChatList/ChatList';
import MessageList from '@/containers/Chat/Message/List/MessageList';
import { chatNewMessagesAction } from "@/store/actions/chat/chatNewMessagesAction";
import Badge from "@material-ui/core/Badge/Badge";

@withStyles(styles)
@connect(
  state => ({ ...state.chat, newMessage: state.chatNewMessage }),
  dispatch => ({
    toggleDrawer: active => dispatch(chatAction.toggle(active)),
    chooseChat: chat => dispatch(chatAction.chooseChat(chat)),
    backToList: () => dispatch(chatAction.backToList()),
    volumeOn: () => dispatch(chatAction.volumeOn()),
    volumeOff: () => dispatch(chatAction.volumeOff()),
    getTotalMessages: () => dispatch(chatNewMessagesAction.getTotal()),
    changeNewMessages: data => dispatch(chatNewMessagesAction.change(data)),
    listenNewMessage: () => dispatch(chatNewMessagesAction.listen())
  })
)
export default class Chat extends Component {

  componentWillMount() {
    this.props.listenNewMessage();
    this.props.getTotalMessages();
  }

  handleDrawer(active) {
    this.props.toggleDrawer(active);

    if (active && this.props.activeChat) {
      this.changeNoReadMessages(this.props.activeChat.id);
    }
  }

  handleVolume(value) {
    value ? this.props.volumeOn() : this.props.volumeOff();
  }

  handleChooseChat(chat) {
    this.changeNoReadMessages(chat.id);
    this.props.chooseChat(chat);
  }

  changeNoReadMessages(chatId) {
    const detail = [...this.props.newMessage.detail]
      .filter(({ chat_id }) => +chat_id !== +chatId);

    this.props.changeNewMessages(detail);
  }

  render() {
    const { classes, activeChat, volume, newMessage, active } = this.props;

    return (
      <React.Fragment>
        <Drawer anchor="right" open={active} onClose={() => this.handleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
          >
            {!activeChat ? (
              <ChatList
                volume={volume}
                onChangeVolume={value => this.handleVolume(value)}
                onCloseChat={() => this.handleDrawer(false)}
                onClick={chat => this.handleChooseChat(chat)}
              />
            ) : (
              <MessageList
                volume={volume}
                onBack={() => this.props.backToList()}
                onChangeVolume={value => this.handleVolume(value)}
                onCloseChat={() => this.handleDrawer(false)}
                chat={activeChat}
              />
            )}
          </div>
        </Drawer>

        <Button
          className={classes.button}
          variant="fab"
          color="primary"
          onClick={() => this.handleDrawer(true)}
        >
          {newMessage.total > 0 ? (
            <Badge badgeContent={newMessage.total} color="secondary">
              <ChatIcon />
            </Badge>
          ) : <ChatIcon />}
        </Button>
      </React.Fragment>
    )
  }
}