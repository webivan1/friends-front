import {
  LOGIN_FORM_LOADER,
  LOGIN_FORM_SUCCESS,
  LOGIN_FORM_FAIL
} from '../actionTypes';
import axios from '../../../axios/axios-api';
import env from '../../../env/env';
import AuthService from '../../../services/auth/AuthService';
import ErrorHelper from "../../../helpers/ErrorHelper";
import { login, getUser } from "../user/userAction";

export function submit(params) {
  return async dispatch => {
    dispatch(loader());

    const paramAuth = dataAuthByParams(params);

    try {
      const { data } = await axios.post('/oauth/token', paramAuth);

      safeAuthData(data);

      const response = await getUser();

      dispatch(success());
      dispatch(login(response.data));

    } catch (e) {
      AuthService.getInstance().removeAll();
      dispatch(error(ErrorHelper.getMessageByError(e)))
    }
  }
}

export function safeAuthData(data) {
  AuthService.getInstance()
    .removeAll()
    .setToken(data.access_token)
    .setRefreshToken(data.refresh_token)
    .setExpiresIn(data.expires_in);
}

export function dataAuthByParams(params) {
  return {
    grant_type: 'password',
    client_id: env.auth.clientId,
    client_secret: env.auth.clientSecret,
    username: params.email,
    password: params.password,
    scope: '',
  }
}

export function error(error) {
  return { type: LOGIN_FORM_FAIL, payload: error };
}

export function success() {
  return { type: LOGIN_FORM_SUCCESS };
}

export function loader() {
  return { type: LOGIN_FORM_LOADER }
}