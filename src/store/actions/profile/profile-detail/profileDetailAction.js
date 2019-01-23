import axios from '../../../../axios/axios-api';
import {
  PROFILE_DETAIL_PAGE_INIT,
  PROFILE_DETAIL_PAGE_FAIL,
  PROFILE_DETAIL_PAGE_CHANGE_DATA
} from "../../actionTypes";
import ErrorHelper from "../../../../helpers/ErrorHelper";
import FetchService from "../../../../services/fetch/FetchService";

export function init() {
  return async dispatch => {
    try {
      const { data } = await FetchService.http(axios).get(`/user/form`);
      dispatch(initComplete(data.form, data.labels));
    } catch (e) {
      dispatch(initFail(ErrorHelper.getMessageByError(e)));
    }
  }
}

export function changeFormData(data) {
  return { type: PROFILE_DETAIL_PAGE_CHANGE_DATA, payload: data };
}

export function initComplete(data, labels) {
  return { type: PROFILE_DETAIL_PAGE_INIT, payload: { data, labels } };
}

export function initFail(message) {
  return { type: PROFILE_DETAIL_PAGE_FAIL, payload: message };
}