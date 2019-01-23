import AuthService from "../../../services/auth/AuthService";
import { RESET_STATE, USER_INIT, USER_LOGIN, USER_LOGOUT } from "../actionTypes";
import FetchService from "../../../services/fetch/FetchService";
import axios from '../../../axios/axios-api';
import env from '../../../env/env';
import { safeAuthData } from "../login-form/loginFormAction";
import EchoServer from "../../../echo-server/EchoServer";

export function getUser() {
  return FetchService.http(axios).get('/user');
}

export function login(user) {
  return { type: USER_LOGIN, payload: user };
}

export function logout(refererUrl = null, lang = null) {
  return dispatch => {
    const echo = EchoServer(AuthService.getInstance().getToken());

    Object.keys(echo.connector.channels).map(channel => echo.leave(channel));

    FetchService.http(axios).post('/auth/logout');

    AuthService.getInstance().removeAll();

    dispatch({
      type: USER_LOGOUT, payload: refererUrl === null ? {
        referer: null,
        redirect: null
      } : {
        referer: window.location.pathname,
        redirect: `/${lang}/login`
      }
    });

    dispatch({ type: RESET_STATE });
  }
}

export function autoLogin() {
  return async dispatch => {
    if (AuthService.getInstance().isToken()) {
      try {
        if (AuthService.getInstance().isUpdateToken()) {
          const response = await updateToken();
          safeAuthData(response.data);
        }

        const { data } = await getUser();
        dispatch(login(data));
        return;
      } catch (e) {
        console.error(e);
      }
    }

    dispatch(logout());
  }
}

export function updateToken() {
  return axios.post('/oauth/token', {
    grant_type: 'refresh_token',
    refresh_token: AuthService.getInstance().getRefreshToken(),
    client_id: env.auth.clientId,
    client_secret: env.auth.clientSecret,
    scope: ''
  });
}