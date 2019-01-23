import axios from '../../../../axios/axios-api';
import {
  PROFILE_DETAIL_FORM_LOADER,
  PROFILE_DETAIL_FORM_SUCCESS,
  PROFILE_DETAIL_FORM_FAIL
} from "../../actionTypes";
import ErrorHelper from "../../../../helpers/ErrorHelper";
import FetchService from "../../../../services/fetch/FetchService";
import { changeFormData } from "./profileDetailAction";

export function save(formData) {
  return async dispatch => {
    dispatch(loader());

    try {
      const { data } = await FetchService.http(axios).post(`/user/form`, formData);
      dispatch(changeFormData(formData));
      dispatch(success(data.data.message));
    } catch (e) {
      dispatch(fail(ErrorHelper.getMessageByError(e)));
    }
  }
}

function loader() {
  return { type: PROFILE_DETAIL_FORM_LOADER };
}

function success(message) {
  return { type: PROFILE_DETAIL_FORM_SUCCESS, payload: message };
}

function fail(message) {
  return { type: PROFILE_DETAIL_FORM_FAIL, payload: message };
}