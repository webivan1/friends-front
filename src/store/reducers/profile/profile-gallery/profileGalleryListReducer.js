import {
  PROFILE_GALLERY_LIST_COMPLETE,
  PROFILE_GALLERY_LIST_ERROR_INIT,
  PROFILE_GALLERY_LIST_APPEND_LOADER,
  PROFILE_GALLERY_LIST_ADD_MODELS,
  RESET_STATE
} from "../../../actions/actionTypes";

const initialState = {
  error: null,
  loader: true,
  appendLoader: false,
  models: [],
  page: 1,
  total: 0,
  nextPage: null,
};

export default function profileGalleryListReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_GALLERY_LIST_APPEND_LOADER:
      return {...state, appendLoader: true};
    case PROFILE_GALLERY_LIST_COMPLETE:
      return {...state, loader: false, ...action.payload};
    case PROFILE_GALLERY_LIST_ERROR_INIT:
      return {...state, loader: false, error: action.payload};
    case PROFILE_GALLERY_LIST_ADD_MODELS:
      return {...state, ...action.payload};
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}