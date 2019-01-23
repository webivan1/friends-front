import {
  PROFILE_GALLERY_LIST_COMPLETE,
  PROFILE_GALLERY_LIST_ERROR_INIT,
  PROFILE_GALLERY_LIST_APPEND_LOADER,
  PROFILE_GALLERY_LIST_ADD_MODELS
} from "../../actionTypes";
import axios from "../../../../axios/axios-api";
import FetchService from "../../../../services/fetch/FetchService";
import ErrorHelper from "../../../../helpers/ErrorHelper";

export function getModelsAction(first = true) {
  return async (dispatch, getState) => {
    const state = getState();

    const { user } = state.user;
    const { nextPage, loader, models } = state.profileGalleryList;

    const url = first ? `/user/form/gallery` : (nextPage || null);

    if (!url) {
      return false;
    }

    !loader && dispatch(appendLoader());

    try {
      const { data } = await FetchService.http(axios).get(url);

      let nextUrl = null;

      if (data.next_page_url) {
        const url = new URL(data.next_page_url);
        nextUrl = url.pathname + url.search;
      }

      dispatch(complete({
        models: first ? data.data : models.concat(data.data),
        page: data.current_page,
        nextPage: nextUrl,
        total: data.total
      }));

      setTimeout(() => dispatch(getModelsAction(false)), 700);
    } catch (e) {
      dispatch(error(ErrorHelper.getMessageByError(e)));
    }
  }
}

export function addModels(newData, oldData, total) {
  return { type: PROFILE_GALLERY_LIST_ADD_MODELS, payload: {
    models: newData.concat(oldData),
    total
  } };
}

function appendLoader() {
  return { type: PROFILE_GALLERY_LIST_APPEND_LOADER };
}

function complete(data) {
  return {  type: PROFILE_GALLERY_LIST_COMPLETE, payload: data }
}

function error(message) {
  return { type: PROFILE_GALLERY_LIST_ERROR_INIT, payload: message };
}


