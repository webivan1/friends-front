import {
  PROFILE_GALLERY_UPLOAD_LOADER,
  PROFILE_GALLERY_UPLOAD_SUCCESS,
  PROFILE_GALLERY_UPLOAD_FAIL, RESET_STATE
} from "../../../actions/actionTypes";

const initialState = {
  loader: false,
  success: null,
  fail: null,
};

export default function profileGalleryUploadReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_GALLERY_UPLOAD_LOADER:
      return {...state, loader: true, success: null, fail: null};
    case PROFILE_GALLERY_UPLOAD_SUCCESS:
      return {...state, loader: false, success: action.payload, fail: null};
    case PROFILE_GALLERY_UPLOAD_FAIL:
      return {...state, loader: false, success: null, fail: action.payload};
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}