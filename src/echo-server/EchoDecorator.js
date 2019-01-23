export default class EchoDecorator {
  constructor(echoService) {
    this.echoService = echoService;
    return new Proxy(echoService, this);
  }

  get(target, prop) {
    if (this[prop]) {
      return (...args) => this[prop].apply(this, args);
    }

    if (typeof target[prop] === 'function') {
      return (...args) => target[prop].apply(target, args);
    } else {
      return target[prop];
    }
  }

  unsubscribeIfExist(channel) {
    Object.keys(this.echoService.connector.channels).map(channelName => {
      channel === channelName ? this.echoService.leave(channelName) : null;
    });
  }

  hasChannel(channel) {
    return Object.keys(this.echoService.connector.channels).find(channelName => {
      return channel === channelName;
    });
  }

  private(channel) {
    this.unsubscribeIfExist(`private-${channel}`);
    return this.echoService.private(channel);
  }
}