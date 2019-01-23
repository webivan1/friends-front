import {
  INVITE_LIST_LOADER_LIST,
  INVITE_LIST_QUERY,
  INVITE_LIST_ERROR,
  INVITE_LIST_TRANSFORM
} from '../actionTypes';
import axios from '../../../axios/axios-api';
import FetchService from "../../../services/fetch/FetchService";
import ErrorHelper from "../../../helpers/ErrorHelper";
import { loaderOff, loaderOn } from "../loader/loaderAction";
import { correctUrl } from "../people/peopleListAction";

export function fetchModels(url, append) {
  return async (dispatch, getState) => {
    const state = getState();
    const { models } = state.inviteList;

    dispatch(loaderList());
    dispatch(loaderOn());

    try {
      const { data } = await FetchService.http(axios).get(url);
      dispatch(queryResult(url, data, append ? models : []));
    } catch (e) {
      dispatch(error(ErrorHelper.getMessageByError(e)));
    }

    dispatch(loaderOff());
  }
}

export function transformModels(models) {
  return { type: INVITE_LIST_TRANSFORM, payload: models }
}

function loaderList() {
  return { type: INVITE_LIST_LOADER_LIST }
}

function error(error) {
  return { type: INVITE_LIST_ERROR, payload: error }
}

function queryResult(url, response, models) {
  const payload = {
    models: models.concat(response.data),
    url,
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

  return { type: INVITE_LIST_QUERY, payload }
}