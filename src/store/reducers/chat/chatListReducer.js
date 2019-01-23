import {
  CHAT_LIST_USER_LOADER,
  CHAT_LIST_USER_QUERY,
  CHAT_LIST_USER_ERROR,
  RESET_STATE
} from "../../actions/actionTypes";

const initialState = {
  loaderList: true,
  url: null,
  models: [],
  formData: {},
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

export default function chatListReducer(state = initialState, action) {
  switch (action.type) {
    case CHAT_LIST_USER_LOADER:
      return {...state, error: null, loaderList: true};
    case CHAT_LIST_USER_QUERY:
      return {...state, error: null, loaderList: false, ...action.payload};
    case CHAT_LIST_USER_ERROR:
      return {...state, error: action.payload, loaderList: false};
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}