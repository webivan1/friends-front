import store from '../../store';
import EchoServer from '../../../echo-server/EchoServer'
import { NOTIFY_CHANGE } from "../actionTypes";
import AuthService from "../../../services/auth/AuthService";

export class notificationAction {
  static dispatchNotify(notify) {
    store.dispatch(this.add(notify));
  }

  static add(notify) {
    let messages = store.getState().notification.messages.concat();
    messages.push(notify);
    return this.change(messages);
  }

  static remove(notify) {
    let messages = store.getState().notification.messages.concat();
    messages.splice(messages.indexOf(notify), 1);
    return this.change(messages);
  }

  static listen() {
    return (dispatch, getState) => {
      const { user } = getState().user;

      EchoServer(AuthService.getInstance().getToken())
        .private(`notification.${user.id}`)
        .on('message', notify => dispatch(this.add(notify)));
    }
  }

  static unsubscribe() {
    const { user } = store.getState().user;
    EchoServer(AuthService.getInstance().getToken())
      .leave(`notification.${user.id}`);
  }

  static change(payload) {
    return { type: NOTIFY_CHANGE, payload }
  }
}