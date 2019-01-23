import {
  REGISTER_FORM_FAIL,
  REGISTER_FORM_LOADER,
  REGISTER_FORM_SUCCESS
} from "../actionTypes";
import axios from '../../../axios/axios-api';
import ErrorHelper from "../../../helpers/ErrorHelper";

export function register(formData) {
  return async (dispatch, getState) => {
    dispatch(loader());

    try {
      const { data } = await axios.post(`/auth/register`, formData);
      dispatch(success(data.data.message));
    } catch (e) {
      dispatch(fail(ErrorHelper.getMessageByError(e)));
    }
  }
}

export function fail(message) {
  return { type: REGISTER_FORM_FAIL, payload: message }
}

export function success(message) {
  return { type: REGISTER_FORM_SUCCESS, payload: message }
}

export function loader() {
  return { type: REGISTER_FORM_LOADER }
}