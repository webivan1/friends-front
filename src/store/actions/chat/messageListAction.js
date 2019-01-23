import { loaderOff, loaderOn } from "../loader/loaderAction";
import FetchService from "../../../services/fetch/FetchService";
import axios from "../../../axios/axios-api";
import ErrorHelper from "../../../helpers/ErrorHelper";
import {
  MESSAGE_LIST_USER_LOADER,
  MESSAGE_LIST_USER_QUERY,
  MESSAGE_LIST_USER_ERROR,
  MESSAGE_LIST_USER_ADD_ITEM,
  MESSAGE_LIST_USER_CLEAR
} from "../actionTypes";
import { correctUrl } from "../people/peopleListAction";
import EchoServer from "../../../echo-server/EchoServer";
import AuthService from "../../../services/auth/AuthService";

export class messageListAction {
  static fetchModels(url, append = true) {
    return async (dispatch, getState) => {
      const state = getState();
      const { models } = state.messageList;

      dispatch(this.loaderList());
      dispatch(loaderOn());

      try {
        const { data } = await FetchService.http(axios).post(url);

        dispatch(this.queryResult(url, data, append ? models : []));
      } catch (e) {
        dispatch(this.error(ErrorHelper.getMessageByError(e)));
      }

      dispatch(loaderOff());
    }
  }

  static queryResult(url, response, models) {
    const payload = {
      url,
      models: response.data.concat(models),
      totalItems: response.total,
      currentPage: response.current_page,
      perPage: response.per_page,
      lastPage: response.last_page,
      nextPageUrl: correctUrl(response.next_page_url),
      prevPageUrl: correctUrl(response.prev_page_url),
      firstPageUrl: correctUrl(response.first_page_url),
      lastPageUrl: correctUrl(response.lastPageUrl)
    };

    return { type: MESSAGE_LIST_USER_QUERY, payload }
  }

  static loaderList() {
    return { type: MESSAGE_LIST_USER_LOADER }
  }

  static error(error) {
    return { type: MESSAGE_LIST_USER_ERROR, payload: error }
  }

  static listenNewMessage(chatId) {
    return (dispatch, getState) => {
      const { id } = getState().user.user;
      const channelName = `message.${chatId}.${id}`;
      const echo = EchoServer(AuthService.getInstance().getToken());

      echo.private(channelName).on('create', message => {
        let models = getState().messageList.models.concat();
        models.push(message);
        dispatch({ type: MESSAGE_LIST_USER_ADD_ITEM, payload: models });
      });
    }
  }

  static clear(id) {
    // up last visited
    FetchService.http(axios).get(`/user/chat/${id}/close`);

    return { type: MESSAGE_LIST_USER_CLEAR }
  }
}