import {
  CHAT_NEW_MESSAGES_FETCH
} from '@/store/actions/actionTypes';
import axios from '@/axios/axios-api';
import FetchService from '@/services/fetch/FetchService';
import EchoServer from "@/echo-server/EchoServer";
import AuthService from "@/services/auth/AuthService";

export class chatNewMessagesAction {
  static getTotal() {
    return async dispatch => {
      try {
        const { data } = await FetchService.http(axios).get('/user/chat/new-messages');
        dispatch(this.success(data));
      } catch (e) {
        console.error(e);
      }
    }
  }

  static success(data) {
    let total = 0;

    data.forEach(({ no_read }) => total += +no_read);

    return { type: CHAT_NEW_MESSAGES_FETCH, payload: { total, detail: data } };
  }

  static change(data) {
    return this.success(data);
  }

  static listen() {
    return async (dispatch, getState) => {
      const { id } = getState().user.user;
      const channelName = `new-message.${id}`;
      const echo = EchoServer(AuthService.getInstance().getToken());

      echo.private(channelName).on('create', message => {
        const state = getState();
        const chat = state.chat;
        const volume = state.chat.volume;

        if (chat.active && chat.activeChat && +chat.activeChat.id === +message.chat_id) {
          // @todo Звуковой сигнал
          return false;
        } else {
          const data = [...state.chatNewMessage.detail];
          const item = data.find(({ chat_id }) => +chat_id === +message.chat_id);

          item ? item.no_read++ : data.push({
            chat_id: message.chat_id,
            no_read: 1
          });

          // @todo Звуковой сигнал

          dispatch(this.change(data));
        }
      });
    }
  }
}