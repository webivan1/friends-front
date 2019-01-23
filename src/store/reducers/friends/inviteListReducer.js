import {
  INVITE_LIST_ERROR,
  INVITE_LIST_LOADER_LIST,
  INVITE_LIST_QUERY,
  INVITE_LIST_TRANSFORM,
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
  sortAttributes: [],
  params: {},
  error: null,
};

export default function inviteListReducer(state = initialState, action) {
  switch (action.type) {
    case INVITE_LIST_LOADER_LIST:
      return {...state, error: null, loaderList: true};
    case INVITE_LIST_QUERY:
      return {...state, error: null, loaderList: false, ...action.payload};
    case INVITE_LIST_ERROR:
      return {...state, error: action.payload, loaderList: false};
    case INVITE_LIST_TRANSFORM:
      return {...state, models: action.payload};
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}