import {
  PROFILE_GALLERY_ITEM_INIT,
  PROFILE_GALLERY_ITEM_IS_LOADED,
  PROFILE_GALLERY_ITEM_SAVE,
  PROFILE_GALLERY_ITEM_SAVE_OK,
  PROFILE_GALLERY_ITEM_SAVE_FAIL,
  PROFILE_GALLERY_ITEM_DELETE,
  RESET_STATE
} from "../../../actions/actionTypes";

const initialState = {
  loader: true,
  loaderSubmit: false,
  form: {},
  success: null,
  error: null,
};

export default function profileGalleryItemReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_GALLERY_ITEM_DELETE:
    case PROFILE_GALLERY_ITEM_INIT:
      return {...state, ...initialState};
    case PROFILE_GALLERY_ITEM_IS_LOADED:
      return {...state, loader: false, form: action.payload};
    case PROFILE_GALLERY_ITEM_SAVE:
      return {...state, loaderSubmit: true};
    case PROFILE_GALLERY_ITEM_SAVE_OK:
      return {...state, loaderSubmit: false, success: action.payload, error: null};
    case PROFILE_GALLERY_ITEM_SAVE_FAIL:
      return {...state, loaderSubmit: false, success: null, error: action.payload};
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}