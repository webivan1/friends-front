import { VERIFY_EMAIL_FAIL, VERIFY_EMAIL_LOADER, VERIFY_EMAIL_SUCCESS } from "../actionTypes";
import ErrorHelper from "../../../helpers/ErrorHelper";
import axios from '../../../axios/axios-api';

export function verifyEmail(token) {
  return async (dispatch, getState) => {
    dispatch(loader());

    try {
      const { data } = await axios.get(`/auth/verify/${token}`);
      dispatch(success(data.message));
    } catch (e) {
      dispatch(error(ErrorHelper.getMessageByError(e)));
    }
  }
}

export function loader() {
  return { type: VERIFY_EMAIL_LOADER }
}

export function success(message) {
  return { type: VERIFY_EMAIL_SUCCESS, payload: message }
}

export function error(message) {
  return { type: VERIFY_EMAIL_FAIL, payload: message }
}