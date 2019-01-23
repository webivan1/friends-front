import {
  CHAT_BACK_TO_LIST,
  CHAT_CHOOSE_CHAT,
  CHAT_VOLUME_ON,
  CHAT_VOLUME_OFF,
  CHAT_TOGGLE
} from '../actionTypes';

export class chatAction {
  static chooseChat(chat) {
    return { type: CHAT_CHOOSE_CHAT, payload: chat };
  }

  static backToList() {
    return { type: CHAT_BACK_TO_LIST };
  }

  static volumeOn() {
    return { type: CHAT_VOLUME_ON };
  }

  static volumeOff() {
    return { type: CHAT_VOLUME_OFF };
  }

  static toggle(active) {
    return { type: CHAT_TOGGLE, payload: active };
  }
}