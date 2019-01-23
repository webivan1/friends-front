import OnlineUserService from '@/services/online-users/OnlineUserService'

export default class CollectionOnlineUsers {
  limit = 30;
  collection = [];

  /**
   * @return boolean
   */
  has(onlineUser) {
    return this.collection.some(model => model.hasUserId(onlineUser.userId));
  }

  /**
   * @return CollectionOnlineUsers|null
   */
  add(onlineUser) {
    if (!onlineUser instanceof OnlineUserService || this.has(onlineUser)) {
      return null;
    }

    const self = this.clone();

    if (self.collection.length >= this.limit) {
      const first = self.collection[0];
      first.destroy();

      self.collection.splice(0, 1);
    }

    self.collection.push(onlineUser);

    return self;
  }

  /**
   * @return OnlineUserService[]
   */
  getCollection() {
    return this.collection;
  }

  /**
   * @return OnlineUserService[]
   */
  each(callable) {
    return this.collection.map(model => callable(model));
  }

  /**
   * @return CollectionOnlineUsers
   */
  clone() {
    return Object.assign(Object.create(this), this);
  }

  /**
   * @return OnlineUserService|null
   */
  getModelByUser(userId) {
    return this.collection.find(model => model.hasUserId(userId));
  }
}