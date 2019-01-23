import {
  CHAT_NEW_MESSAGES_FETCH
} from '@/store/actions/actionTypes';

const initialState = {
  loader: true,
  total: 0,
  detail: []
};

export default function chatNewMessagesReducer(state = initialState, action) {
  switch (action.type) {
    case CHAT_NEW_MESSAGES_FETCH:
      return { ...state, loader: false, ...action.payload };
    default:
      return state;
  }
}