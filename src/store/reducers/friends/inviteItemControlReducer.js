import {
  INVITE_CONTROL_ERROR,
  INVITE_CONTROL_LOADER,
  INVITE_CONTROL_SUCCESS
} from "../../actions/actionTypes";

const initialState = {
  loader: false,
  error: null
};

export default function inviteItemControlReducer(state = initialState, action) {
  switch (action) {
    case INVITE_CONTROL_LOADER:
      return { ...state, loader: true, error: null };
    case INVITE_CONTROL_SUCCESS:
      return { ...state, loader: false, error: null };
    case INVITE_CONTROL_ERROR:
      return { ...state, loader: false, error: action.payload };
    default:
      return state;
  }
}