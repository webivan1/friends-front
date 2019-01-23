export default class AuthService {

  static instance;

  token = 'token';
  refreshToken = 'refreshToken';
  expiresIn = 'expiresIn';

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  isToken() {
    return !!this.getToken();
  }

  isRefreshToken() {
    return !!this.getRefreshToken();
  }

  setToken(token) {
    window.localStorage.setItem(this.token, token);
    return this;
  }

  setRefreshToken(refreshToken) {
    window.localStorage.setItem(this.refreshToken, refreshToken);
    return this;
  }

  setExpiresIn(expiresIn) {
    window.localStorage.setItem(this.expiresIn,
      new Date((new Date).getTime() + (expiresIn * 1000))
    );
    return this;
  }

  getToken() {
    return window.localStorage.getItem(this.token);
  }

  getRefreshToken() {
    return window.localStorage.getItem(this.refreshToken);
  }

  isExpire() {
    const timeout = window.localStorage.getItem(this.expiresIn);
    return Boolean(timeout) === false || new Date(timeout) <= new Date();
  }

  isUpdateToken() {
    return this.isExpire() && this.isRefreshToken();
  }

  removeAll() {
    window.localStorage.removeItem(this.token);
    window.localStorage.removeItem(this.refreshToken);
    window.localStorage.removeItem(this.expiresIn);
    return this;
  }
}