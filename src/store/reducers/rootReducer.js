import {combineReducers} from 'redux'

import translateReducer from './translate/translateReducer';
import mobileDetectReducer from './mobile-detect/mobileDetectReducer';
import loginFormReducer from './login-form/loginFormReducer';
import userReducer from './user/userReducer';
import registerFormReducer from "./register-form/registerFormReducer";
import restorePasswordReducer from "./restore-password/restorePasswordReducer";
import verifyEmailReducer from "./verify-email/verifyEmailReducer";
import profileDetailReducer from './profile/profile-detail/profileDetailReducer';
import profileDetailFormReducer from './profile/profile-detail/profileDetailFormReducer';
import profileGalleryUploadReducer from './profile/profile-gallery/profileGalleryUploadReducer';
import profileGalleryListReducer from './profile/profile-gallery/profileGalleryListReducer';
import profileGalleryItemReducer from './profile/profile-gallery/profileGalleryItemReducer';
import profileLocationReducer from './profile/profile-location/profileLocationReducer';
import profileGamesReducer from './profile/profile-games/profileGamesReducer';
import peopleListReducer from './people/peopleListReducer';
import loaderReducer from './loader/loaderReducer';
import userDetailReducer from './user-detail/userDetailReducer';
import imagesListReducer from './user-detail/images/imagesListReducer';
import friendsNewRequestsReducer from "./friends/requests/friendsNewRequestsReducer";
import inviteFormReducer from './friends/inviteFormReducer';
import inviteListReducer from './friends/inviteListReducer';
import notificationReducer from './notification/notificationReducer';
import inviteItemControlReducer from './friends/inviteItemControlReducer';
import chatReducer from './chat/chatReducer';
import chatListReducer from './chat/chatListReducer';
import messageListReducer from './chat/messageListReducer';
import messageFormReducer from './chat/messageFormReducer';
import chatNewMessagesReducer from './chat/chatNewMessagesReducer';
import onlineUserReducer from './user/onlineUserReducer';

export default combineReducers({
  translate: translateReducer,
  mobileDetect: mobileDetectReducer,
  loginForm: loginFormReducer,
  registerForm: registerFormReducer,
  restorePasswordForm: restorePasswordReducer,
  verifyEmail: verifyEmailReducer,
  user: userReducer,
  profileDetailPage: profileDetailReducer,
  profileDetailForm: profileDetailFormReducer,
  profileGalleryUpload: profileGalleryUploadReducer,
  profileGalleryList: profileGalleryListReducer,
  profileGalleryItem: profileGalleryItemReducer,
  profileLocation: profileLocationReducer,
  profileGames: profileGamesReducer,
  peopleList: peopleListReducer,
  loader: loaderReducer,
  userDetail: userDetailReducer,
  imagesList: imagesListReducer,
  friendsNewRequests: friendsNewRequestsReducer,
  inviteForm: inviteFormReducer,
  inviteList: inviteListReducer,
  notification: notificationReducer,
  inviteItemControl: inviteItemControlReducer,
  chat: chatReducer,
  chatNewMessage: chatNewMessagesReducer,
  chatList: chatListReducer,
  messageList: messageListReducer,
  messageForm: messageFormReducer,
  onlineUser: onlineUserReducer
});