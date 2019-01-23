import {
  CHAT_BACK_TO_LIST,
  CHAT_CHOOSE_CHAT,
  CHAT_VOLUME_ON,
  CHAT_VOLUME_OFF,
  CHAT_TOGGLE,
  RESET_STATE
} from "../../actions/actionTypes";

const initialState = {
  active: false,
  activeChat: null,
  volume: true,
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case CHAT_CHOOSE_CHAT:
      return { ...state, activeChat: action.payload };
    case CHAT_BACK_TO_LIST:
      return { ...state, activeChat: false };
    case CHAT_VOLUME_ON:
      return { ...state, volume: true };
    case CHAT_VOLUME_OFF:
      return { ...state, volume: false };
    case CHAT_TOGGLE:
      return { ...state, active: action.payload };
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}