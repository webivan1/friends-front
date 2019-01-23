import {
  GALLERY_LIST_USER_QUERY,
  GALLERY_LIST_USER_LOADER,
  GALLERY_LIST_USER_ERROR,
  GALLERY_LIST_USER_CLEAR
} from "../../actionTypes";
import axios from '../../../../axios/axios-api';
import ErrorHelper from "../../../../helpers/ErrorHelper";
import { correctUrl } from "../../people/peopleListAction";

export function fetchList(url) {
  return async (dispatch, getState) => {
    const state = getState();
    const { models } = state.imagesList;

    dispatch(loader());

    try {
      const { data } = await axios.get(url);
      dispatch(success(data, models))
    } catch (e) {
      dispatch(error(ErrorHelper.getMessageByError(e)));
    }
  }
}

function success(response, oldModels) {
  const payload = {
    models: oldModels.concat(response.data),
    totalItems: response.total,
    currentPage: response.current_page,
    perPage: response.per_page,
    lastPage: response.last_page,
    nextPageUrl: correctUrl(response.next_page_url),
    prevPageUrl: correctUrl(response.prev_page_url),
    firstPageUrl: correctUrl(response.first_page_url),
    lastPageUrl: correctUrl(response.lastPageUrl)
  };

  return { type: GALLERY_LIST_USER_QUERY, payload }
}

function error(error) {
  return { type: GALLERY_LIST_USER_ERROR, payload: error }
}

function loader() {
  return { type: GALLERY_LIST_USER_LOADER }
}

export function clearList() {
  return { type: GALLERY_LIST_USER_CLEAR }
}