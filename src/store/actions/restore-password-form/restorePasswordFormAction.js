import {
  RESTORE_PASSWORD_SEND_CODE_EMAIL,
  RESTORE_PASSWORD_SEND_CODE_FAIL,
  RESTORE_PASSWORD_SEND_CODE_SUCCESS,
  RESTORE_PASSWORD_CHANGE_EMAIL,
  RESTORE_PASSWORD_VERIFY_EMAIL,
  RESTORE_PASSWORD_VERIFY_FAIL,
  RESTORE_PASSWORD_VERIFY_SUCCESS
} from '../actionTypes';
import ErrorHelper from "../../../helpers/ErrorHelper";
import axios from '../../../axios/axios-api';

export function sendEmail(email) {
  return async (dispatch, getState) => {
    dispatch(sendEmailLoader());

    try {
      const { data } = await axios.post(`/auth/restore`, { email });
      dispatch(sendEmailSuccess(email, data.message));
    } catch (e) {
      dispatch(sendEmailFail(ErrorHelper.getMessageByError(e)))
    }
  }
}

export function sendEmailLoader() {
  return { type: RESTORE_PASSWORD_SEND_CODE_EMAIL };
}

export function sendEmailFail(message) {
  return { type: RESTORE_PASSWORD_SEND_CODE_FAIL, payload: message };
}

export function sendEmailSuccess(email, message) {
  return { type: RESTORE_PASSWORD_SEND_CODE_SUCCESS, payload: { email, message } };
}

export function changeEmail() {
  return { type: RESTORE_PASSWORD_CHANGE_EMAIL };
}

export function sendNewPassword(formData) {
  return async (dispatch, getState) => {
    dispatch(sendCodeLoader());

    try {
      const { data } = await axios.post(`/auth/change-password`, formData);
      dispatch(sendCodeSuccess(data.message));
    } catch (e) {
      dispatch(sendCodeFail(ErrorHelper.getMessageByError(e)))
    }
  }
}

export function sendCodeLoader() {
  return { type: RESTORE_PASSWORD_VERIFY_EMAIL };
}

export function sendCodeFail(message) {
  return { type: RESTORE_PASSWORD_VERIFY_FAIL, payload: message };
}

export function sendCodeSuccess(message) {
  return { type: RESTORE_PASSWORD_VERIFY_SUCCESS, payload: message };
}