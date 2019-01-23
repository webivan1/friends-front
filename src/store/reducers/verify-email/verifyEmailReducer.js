import {
  VERIFY_EMAIL_FAIL,
  VERIFY_EMAIL_LOADER,
  VERIFY_EMAIL_SUCCESS
} from "../../actions/actionTypes";

const initialState = {
  loader: false,
  error: null,
  success: null
};

export default function verifyEmailReducer(state = initialState, action) {
  switch (action.type) {
    case VERIFY_EMAIL_LOADER:
      return {...state, loader: true, error: null, success: null};
    case VERIFY_EMAIL_SUCCESS:
      return {...state, loader: false, error: null, success: action.payload};
    case VERIFY_EMAIL_FAIL:
      return {...state, loader: false, success: null, error: action.payload};
    default:
      return state;
  }
}