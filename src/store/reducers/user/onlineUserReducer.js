import CollectionOnlineUsers from '@/services/online-users/CollectionOnlineUsers';
import { ONLINE_USERS_UPDATE, ONLINE_USERS_LIVE } from '@/store/actions/actionTypes';

const initialState = {
  collection: new CollectionOnlineUsers(),
  nextTimeUpdate: 0,
};

export default function onlineUserReducer(state = initialState, action) {
  switch (action.type) {
    case ONLINE_USERS_UPDATE:
      return { ...state, collection: action.payload };
    case ONLINE_USERS_LIVE:
      return { ...state, nextTimeUpdate: action.payload };
    default:
      return state;
  }
}