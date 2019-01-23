import {
  CHAT_MESSAGE_FORM_CLEAR,
  CHAT_MESSAGE_FORM_COMPLETE,
  CHAT_MESSAGE_FORM_SUBMIT
} from '../actionTypes';
import FetchService from '../../../services/fetch/FetchService';
import axios from '../../../axios/axios-api';
import ErrorHelper from "../../../helpers/ErrorHelper";
import { notificationAction } from "../notification/notificationAction";

export class messageFormAction {
  static sendMessage(formData) {
    return async (dispatch, getState) => {
      const state = getState();
      const { id } = state.chat.activeChat;

      dispatch(this.loaderOn());

      try {
        await FetchService.http(axios).post(`/user/chat/${id}/message/create`,
          formData
        );
      } catch (e) {
        notificationAction.dispatchNotify({
          type: 'red',
          theme: 'Error',
          message: ErrorHelper.getMessageByError(e)
        });
      }

      dispatch(this.loaderOff());
    }
  }

  static loaderOn() {
    return { type: CHAT_MESSAGE_FORM_SUBMIT };
  }

  static loaderOff() {
    return { type: CHAT_MESSAGE_FORM_COMPLETE };
  }

  static clear() {
    return { type: CHAT_MESSAGE_FORM_CLEAR };
  }
}