import { USER_DETAIL_CLEAR, USER_DETAIL_ERROR, USER_DETAIL_FETCH } from "../../actions/actionTypes";

const initialState = {
  info: {},
  loaderInfo: true,
  error: null,
};

export default function userDetailReducer(state = initialState, action) {
  switch (action.type) {
    case USER_DETAIL_FETCH:
      return {...state, error: null, info: action.payload, loaderInfo: false};
    case USER_DETAIL_ERROR:
      return {...state, info: {}, error: action.payload, loaderInfo: false};
    case USER_DETAIL_CLEAR:
      return initialState;
    default:
      return state;
  }
}