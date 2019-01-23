import {
  PROFILE_GALLERY_ITEM_INIT,
  PROFILE_GALLERY_ITEM_IS_LOADED,
  PROFILE_GALLERY_ITEM_SAVE,
  PROFILE_GALLERY_ITEM_SAVE_OK,
  PROFILE_GALLERY_ITEM_SAVE_FAIL,
  PROFILE_GALLERY_ITEM_DELETE
} from "../../actionTypes";
import axios from "../../../../axios/axios-api";
import FetchService from "../../../../services/fetch/FetchService";
import ErrorHelper from "../../../../helpers/ErrorHelper";

export function fetchById(id) {
  return async dispatch => {
    dispatch(loader());

    let data = null;

    try {
      const response = await FetchService.http(axios).get(`/user/form/gallery/${id}`);
      data = response.data;
    } catch (e) {
      console.error(e);
    }

    dispatch(isLoaded(data));
  }
}

export function deleteItem(id) {
  return dispatch => {
    dispatch({ type: PROFILE_GALLERY_ITEM_DELETE });
    FetchService.http(axios).delete(`/user/form/gallery/${id}`);
  }
}

export function updateItem(formData, id) {
  return async (dispatch, getState) => {
    dispatch(loaderSubmit());

    try {
      const { data } = await FetchService.http(axios).post(`/user/form/gallery/${id}`, formData);
      dispatch(successForm(data.message));
    } catch (e) {
      dispatch(errorForm(ErrorHelper.getMessageByError(e)));
    }
  }
}

function loaderSubmit() {
  return { type: PROFILE_GALLERY_ITEM_SAVE }
}

function successForm(message) {
  return { type: PROFILE_GALLERY_ITEM_SAVE_OK, payload: message }
}

function errorForm(message) {
  return { type: PROFILE_GALLERY_ITEM_SAVE_FAIL, payload: message }
}

function loader() {
  return { type: PROFILE_GALLERY_ITEM_INIT }
}

function isLoaded(data = null) {
  let params = null;

  if (data) {
    params = {
      description: data.description,
      avatar: data.avatar
    };
  }

  return { type: PROFILE_GALLERY_ITEM_IS_LOADED, payload: params }
}


