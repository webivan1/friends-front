import AuthService from "../auth/AuthService";
import { logout } from "../../store/actions/user/userAction";
import store from '../../store/store';

export default class FetchService {
  static http(axios) {
    const state = store.getState();

    axios.interceptors.response.use(null, error => {
      if (error.response && error.response.status === 401) {
        if (state.user.isGuest === false) {
          store.dispatch(logout(
            window.location.pathname,
            state.translate.locale
          ));
        }
      }

      return Promise.reject(error);
    });

    Object.assign(axios.defaults.headers.common, {
      'X-App-Locale': state.translate.locale
    });

    if (!AuthService.getInstance().isToken()) {
      return axios;
    }

    const token = AuthService.getInstance().getToken();

    Object.assign(axios.defaults.headers.common, {
      'Authorization': `Bearer ${token}`
    });

    return axios;
  }
}