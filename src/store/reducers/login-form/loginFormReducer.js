import {
  LOGIN_FORM_FAIL,
  LOGIN_FORM_LOADER,
  LOGIN_FORM_SUCCESS
} from '../../actions/actionTypes';

const initialState = {
  loader: false,
  success: false,
  error: false,
  errorMessage: null
};

export default function loginFormReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_FORM_LOADER:
      return {...state, loader: true, error: false};
    case LOGIN_FORM_SUCCESS:
      return {...state, success: true, loader: false};
    case LOGIN_FORM_FAIL:
      return {...state, error: true, errorMessage: action.payload, loader: false};
    default:
      return state
  }
}