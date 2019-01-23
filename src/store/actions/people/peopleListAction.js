import {
  PEOPLE_LIST_LOADER_LIST,
  PEOPLE_LIST_QUERY,
  PEOPLE_LIST_ERROR
} from '../actionTypes';
import axios from '../../../axios/axios-api';
import FetchService from "../../../services/fetch/FetchService";
import ErrorHelper from "../../../helpers/ErrorHelper";
import { loaderOff, loaderOn } from "../loader/loaderAction";

export function fetchModels(url, formData = {}, appendModels = false) {
  return async (dispatch, getState) => {
    const state = getState();
    const { models } = state.peopleList;

    dispatch(loaderList());
    dispatch(loaderOn());

    try {
      const { data } = await FetchService.http(axios).post(url, {
        ...formData,
        games: !formData.games ? [] : formData.games.map(({ value }) => value),
        genres: !formData.genres ? [] : formData.genres.map(({ value }) => value)
      });

      dispatch(queryResult(url, data, formData, appendModels ? models : null));
    } catch (e) {
      dispatch(error(ErrorHelper.getMessageByError(e)));
    }

    dispatch(loaderOff());
  }
}

function loaderList() {
  return { type: PEOPLE_LIST_LOADER_LIST }
}

function error(error) {
  return { type: PEOPLE_LIST_ERROR, payload: error }
}

export function correctUrl(url) {
  if (!url) {
    return null;
  }

  try {
    const urlModel = new URL(url);
    return urlModel.pathname.substr(urlModel.pathname.indexOf('/', 1)) + urlModel.search;
  } catch (e) {
    return url;
  }
}

function queryResult(url, response, formData, models = null) {
  const payload = {
    models: models ? models.concat(response.data) : response.data,
    url,
    formData,
    totalItems: response.total,
    currentPage: response.current_page,
    perPage: response.per_page,
    lastPage: response.last_page,
    nextPageUrl: correctUrl(response.next_page_url),
    prevPageUrl: correctUrl(response.prev_page_url),
    firstPageUrl: correctUrl(response.first_page_url),
    lastPageUrl: correctUrl(response.lastPageUrl),
    params: response.params,
    sortAttributes: response.sortAttributes.map(sortItem => {
      return {...sortItem, url: correctUrl(sortItem.url)}
    })
  };

  return { type: PEOPLE_LIST_QUERY, payload }
}

export function replacePage(url, page) {
  return url.replace(/page=\d+/, `page=${page}`);
}