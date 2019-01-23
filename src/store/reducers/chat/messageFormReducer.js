import {
  CHAT_MESSAGE_FORM_CLEAR,
  CHAT_MESSAGE_FORM_COMPLETE,
  CHAT_MESSAGE_FORM_SUBMIT,
  RESET_STATE
} from '../../actions/actionTypes';

const initialState = {
  loader: false
};

export default function messageFormReducer(state = initialState, action) {
  switch (action.type) {
    case CHAT_MESSAGE_FORM_SUBMIT:
      return { loader: true };
    case CHAT_MESSAGE_FORM_COMPLETE:
    case CHAT_MESSAGE_FORM_CLEAR:
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}