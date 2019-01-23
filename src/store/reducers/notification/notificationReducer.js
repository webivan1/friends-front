import { NOTIFY_CHANGE, RESET_STATE } from "../../actions/actionTypes";

const initialState = {
  messages: []
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case NOTIFY_CHANGE:
      return { messages: action.payload };
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}