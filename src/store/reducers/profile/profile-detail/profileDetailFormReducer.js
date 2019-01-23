import {
  PROFILE_DETAIL_FORM_FAIL,
  PROFILE_DETAIL_FORM_LOADER,
  PROFILE_DETAIL_FORM_SUCCESS,
  RESET_STATE
} from "../../../actions/actionTypes";

const initialState = {
  loader: false,
  success: null,
  error: null
};

export default function profileDetailFormReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_DETAIL_FORM_LOADER:
      return {...state, loader: true, success: null, error: null};
    case PROFILE_DETAIL_FORM_SUCCESS:
      return {...state, loader: false, success: action.payload, error: null};
    case PROFILE_DETAIL_FORM_FAIL:
      return {...state, loader: false, success: null, error: action.payload};
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}