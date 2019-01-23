import { NEW_FRIEND_REQUEST_CHANGE, NEW_FRIEND_REQUEST_RESULT } from "../../../actions/actionTypes";

const initialState = {
  loader: true,
  total: 0
};

export default function friendsNewRequestsReducer(state = initialState, action) {
  switch (action.type) {
    case NEW_FRIEND_REQUEST_RESULT:
      return {...state, loader: false, total: action.payload};
    case NEW_FRIEND_REQUEST_CHANGE:
      return {...state, total: +state.total + action.payload};
    default:
      return state;
  }
}