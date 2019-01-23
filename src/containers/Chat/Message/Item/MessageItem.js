import React from 'react';
import Avatar from "@material-ui/core/Avatar/Avatar";
import TimeAgo from 'react-time-ago/no-tooltip';
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import IsOnlineUser from "@/containers/OnlineUser/IsOnlineUser";

const MessageItem = ({ yourMessage, lang, ...params }) => {
  const classList = ['chat-messages-item'];

  if (yourMessage) {
    classList.push('chat-messages-item-own-message')
  }

  const AvatarUser = (
    params.image ? (
      <ListItemAvatar>
        <IsOnlineUser userId={params.user_id}>
          <div className="chat-messages-item-avatar online-user-detect-avatar">
            <Avatar
              alt={''}
              src={params.image}
            />
          </div>
        </IsOnlineUser>
      </ListItemAvatar>
    ) : null
  );

  return (
    <div className="chat-messages">
      <div className={classList.join(' ')}>
        {AvatarUser}
        <div className="chat-messages-item-message">
          <div
            className="chat-messages-item-message-text"
            dangerouslySetInnerHTML={{__html: params.message}}
          />
          <div className="chat-messages-item-message-hint">
            <TimeAgo locale={lang}>{params.created}</TimeAgo>
          </div>
        </div>
      </div>
    </div>
  )
};

export default MessageItem;
