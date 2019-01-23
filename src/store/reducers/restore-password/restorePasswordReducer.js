import {
  RESTORE_PASSWORD_CHANGE_EMAIL,
  RESTORE_PASSWORD_SEND_CODE_EMAIL,
  RESTORE_PASSWORD_SEND_CODE_FAIL,
  RESTORE_PASSWORD_SEND_CODE_SUCCESS,
  RESTORE_PASSWORD_VERIFY_EMAIL,
  RESTORE_PASSWORD_VERIFY_FAIL,
  RESTORE_PASSWORD_VERIFY_SUCCESS
} from "../../actions/actionTypes";

const initialState = {
  loader: false,
  email: null,
  error: null,
  success: null
};

export default function restorePasswordReducer(state = initialState, action) {
  switch (action.type) {
    case RESTORE_PASSWORD_SEND_CODE_EMAIL:
      return {...state, loader: true, error: null, success: null};
    case RESTORE_PASSWORD_SEND_CODE_SUCCESS:
      return {
        ...state,
        loader: false,
        email: action.payload.email,
        success: action.payload.message
      };
    case RESTORE_PASSWORD_SEND_CODE_FAIL:
      return {...state, loader: false, email: null, error: action.payload, success: null};
    case RESTORE_PASSWORD_CHANGE_EMAIL:
      return {...state, email: null, error: null, success: null};
    case RESTORE_PASSWORD_VERIFY_EMAIL:
      return {...state, loader: true, error: null, success: null};
    case RESTORE_PASSWORD_VERIFY_SUCCESS:
      return {...state, loader: false, error: null, success: action.payload};
    case RESTORE_PASSWORD_VERIFY_FAIL:
      return {...state, loader: false, error:  action.payload, success: null};
    default:
      return state;
  }
}