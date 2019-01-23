import {
  INVITE_FORM_CLEAR,
  INVITE_FORM_ERROR,
  INVITE_FORM_SENDING,
  INVITE_FORM_SUCCESS
} from "../actionTypes";
import FetchService from "../../../services/fetch/FetchService";
import axios from "../../../axios/axios-api";
import ErrorHelper from "../../../helpers/ErrorHelper";

export function sendInvite(formData) {
  return async (dispatch, getState) => {
    dispatch(loader());

    try {
      const { data } = await FetchService.http(axios).post(`/user/friend/invite`, formData);
      dispatch(success(data.message));
    } catch (e) {
      dispatch(error(ErrorHelper.getMessageByError(e)));
    }
  }
}

export function clearInviteForm() {
  return { type: INVITE_FORM_CLEAR }
}

function error(error) {
  return { type: INVITE_FORM_ERROR, payload: error }
}

function success(message) {
  return { type: INVITE_FORM_SUCCESS, payload: message }
}

function loader() {
  return { type: INVITE_FORM_SUCCESS }
}