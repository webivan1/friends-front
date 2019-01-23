import io from 'socket.io-client'
import env from '@/env/env'

export default class OnlineUserService {
  constructor(userId) {
    this.userId = +userId;
    this.server = io(env.onlineUserHost);
    this.lastUpdate = 0;
    this.timer = null;
    this.online = false;
    this.events = [];

    this.run();
  }

  hasUserId(userId) {
    return +userId === this.userId;
  }

  changeStatus(status) {
    this.online = status;
    this.events.forEach(callable => callable(this.userId, this.online));
  }

  clearEvents() {
    this.events = [];
  }

  onChangeStatus(callable) {
    this.events.push(callable);
  }

  isOnline() {
    return this.online;
  }

  eventRegister() {
    this.channelOnline = `is.online.${this.userId}`;
    this.channelOffline = `is.disconnect.${this.userId}`;

    this.server.off(this.channelOnline).on(this.channelOnline, () => this.changeStatus(true));
    this.server.off(this.channelOffline).on(this.channelOffline, () => this.changeStatus(false));
  }

  run() {
    this.eventRegister();
    this.server.emit('send.user', this.userId);
    this.timer = setInterval(() => this.server.emit('send.user', this.userId), 5000);
  }

  destroy() {
    this.timer && clearInterval(this.timer);
    if (this.server) {
      this.server.off(this.channelOnline);
      this.server.off(this.channelOffline);
    }
  }
}