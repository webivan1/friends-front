import {
  PROFILE_DETAIL_PAGE_FAIL,
  PROFILE_DETAIL_PAGE_INIT,
  PROFILE_DETAIL_PAGE_CHANGE_DATA,
  RESET_STATE
} from "../../../actions/actionTypes";

const initialState = {
  init: false,
  data: {},
  labels: {},
  error: null
};

export default function profileDetailReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_DETAIL_PAGE_INIT:
      return {
        ...state,
        ...action.payload,
        init: true,
        error: null
      };
    case PROFILE_DETAIL_PAGE_FAIL:
      return {...state, init: false, data: {}, labels: {}, error: action.payload};
    case PROFILE_DETAIL_PAGE_CHANGE_DATA:
      return {...state, data: action.payload };
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}