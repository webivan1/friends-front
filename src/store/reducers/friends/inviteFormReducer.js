import {
  INVITE_FORM_CLEAR,
  INVITE_FORM_ERROR,
  INVITE_FORM_SENDING,
  INVITE_FORM_SUCCESS
} from "../../actions/actionTypes";

const initialState = {
  loader: false,
  error: null,
  success: null
};

export default function inviteFormReducer(state = initialState, action) {
  switch (action.type) {
    case INVITE_FORM_SENDING:
      return { loader: true, error: null, success: null };
    case INVITE_FORM_SUCCESS:
      return { loader: false, error: null, success: action.payload };
    case INVITE_FORM_ERROR:
      return { loader: false, error: action.payload, success: null };
    case INVITE_FORM_CLEAR:
      return { ...initialState };
    default:
      return state;
  }
}