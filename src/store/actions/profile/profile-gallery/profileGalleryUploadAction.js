import {
  PROFILE_GALLERY_UPLOAD_LOADER,
  PROFILE_GALLERY_UPLOAD_SUCCESS,
  PROFILE_GALLERY_UPLOAD_FAIL
} from "../../actionTypes";
import axios from "../../../../axios/axios-api";
import FetchService from "../../../../services/fetch/FetchService";
import ErrorHelper from "../../../../helpers/ErrorHelper";
import { addModels } from "./profileGalleryListAction";

export function uploadPhotos(images) {
  return async (dispatch, getState) => {
    dispatch(loader());

    const state = getState();
    const { models, total } = state.profileGalleryList;

    let formData = new FormData();

    images.forEach(file => {
      formData.append('images[]', file.file, file.name);
    });

    try {
      const { data } = await FetchService.http(axios).post(`/user/form/gallery`, formData);
      dispatch(addModels(data, models, total + data.length));
      dispatch(success(data));
    } catch (e) {
      dispatch(error(ErrorHelper.getMessageByError(e)));
    }
  }
}

function loader() {
  return { type: PROFILE_GALLERY_UPLOAD_LOADER };
}

function success(images) {
  return { type: PROFILE_GALLERY_UPLOAD_SUCCESS, payload: images }
}

function error(message) {
  return { type: PROFILE_GALLERY_UPLOAD_FAIL, payload: message }
}

