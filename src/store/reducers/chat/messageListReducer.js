import {
  MESSAGE_LIST_USER_LOADER,
  MESSAGE_LIST_USER_QUERY,
  MESSAGE_LIST_USER_ERROR,
  MESSAGE_LIST_USER_ADD_ITEM,
  MESSAGE_LIST_USER_CLEAR,
  RESET_STATE
} from "../../actions/actionTypes";

const initialState = {
  loaderList: true,
  url: null,
  models: [],
  totalItems: 0,
  lastPage: 0,
  currentPage: 1,
  perPage: 0,
  nextPageUrl: null,
  prevPageUrl: null,
  firstPageUrl: null,
  lastPageUrl: null,
  error: null,
};

export default function messageListReducer(state = initialState, action) {
  switch (action.type) {
    case MESSAGE_LIST_USER_LOADER:
      return {...state, error: null, loaderList: true};
    case MESSAGE_LIST_USER_QUERY:
      return {...state, error: null, loaderList: false, ...action.payload};
    case MESSAGE_LIST_USER_ERROR:
      return {...state, error: action.payload, loaderList: false};
    case MESSAGE_LIST_USER_ADD_ITEM:
      return {...state, models: action.payload};
    case MESSAGE_LIST_USER_CLEAR:
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}