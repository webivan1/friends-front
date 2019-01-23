import {
  GALLERY_LIST_USER_QUERY,
  GALLERY_LIST_USER_LOADER,
  GALLERY_LIST_USER_ERROR,
  GALLERY_LIST_USER_CLEAR
} from "../../../actions/actionTypes";

const initialState = {
  loaderList: false,
  url: null,
  models: [],
  totalItems: 0,
  lastPage: 0,
  currentPage: 1,
  perPage: 0,
  nextPageUrl: null,
  prevPageUrl: null,
  firstPageUrl: null,
  lastPageUrl: null
};

export default function imagesListReducer(state = initialState, action) {
  switch (action.type) {
    case GALLERY_LIST_USER_LOADER:
      return {...state, loaderList: true, error: null};
    case GALLERY_LIST_USER_QUERY:
      return {...state, loaderList: false, ...action.payload};
    case GALLERY_LIST_USER_ERROR:
      return {...state, error: action.payload};
    case GALLERY_LIST_USER_CLEAR:
      return initialState;
    default:
      return state;
  }
}