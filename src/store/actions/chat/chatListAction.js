import { loaderOff, loaderOn } from "../loader/loaderAction";
import FetchService from "../../../services/fetch/FetchService";
import axios from "../../../axios/axios-api";
import ErrorHelper from "../../../helpers/ErrorHelper";
import {
  CHAT_LIST_USER_LOADER,
  CHAT_LIST_USER_QUERY,
  CHAT_LIST_USER_ERROR
} from "../actionTypes";
import { correctUrl } from "../people/peopleListAction";

export class chatListAction {
  static fetchModels(url, formData, append = true) {
    return async (dispatch, getState) => {
      const state = getState();
      const { models } = state.chatList;

      dispatch(this.loaderList());
      dispatch(loaderOn());

      try {
        const { data } = await FetchService.http(axios).post(url, {
          ...formData,
        });

        dispatch(this.queryResult(url, data, formData, append ? models : []));
      } catch (e) {
        dispatch(this.error(ErrorHelper.getMessageByError(e)));
      }

      dispatch(loaderOff());
    }
  }

  static queryResult(url, response, formData, models) {
    const payload = {
      url,
      formData,
      models: models.concat(response.data),
      totalItems: response.total,
      currentPage: response.current_page,
      perPage: response.per_page,
      lastPage: response.last_page,
      nextPageUrl: correctUrl(response.next_page_url),
      prevPageUrl: correctUrl(response.prev_page_url),
      firstPageUrl: correctUrl(response.first_page_url),
      lastPageUrl: correctUrl(response.lastPageUrl)
    };

    return { type: CHAT_LIST_USER_QUERY, payload }
  }

  static loaderList() {
    return { type: CHAT_LIST_USER_LOADER }
  }

  static error(error) {
    return { type: CHAT_LIST_USER_ERROR, payload: error }
  }
}