import {
  REGISTER_FORM_FAIL,
  REGISTER_FORM_LOADER,
  REGISTER_FORM_SUCCESS
} from "../../actions/actionTypes";

const initialState = {
  loader: false,
  error: null,
  success: null
};

export default function registerFormReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_FORM_LOADER:
      return {...state, loader: true};
    case REGISTER_FORM_SUCCESS:
      return {...state, success: action.payload, loader: false, error: null};
    case REGISTER_FORM_FAIL:
      return {...state, success: null, loader: false, error: action.payload};
    default:
      return state;
  }
}