import {
  USER_DETAIL_FETCH,
  USER_DETAIL_CLEAR,
  USER_DETAIL_ERROR
} from '../actionTypes';
import axios from '../../../axios/axios-api';
import ErrorHelper from "../../../helpers/ErrorHelper";
import { loaderOff, loaderOn } from "../loader/loaderAction";

export function fetchInfo(id) {
  return async (dispatch, getState) => {
    dispatch(loaderOn());

    try {
      const { data } = await axios.get(`/people/${id}`);
      dispatch(successFetch(data));
    } catch (e) {
      dispatch(errorFetch(ErrorHelper.getMessageByError(e)));
    }

    dispatch(loaderOff());
  }
}

function successFetch(data) {
  return { type: USER_DETAIL_FETCH, payload: data };
}

function errorFetch(error) {
  return { type: USER_DETAIL_ERROR, payload: error };
}

export function clearInfo() {
  return { type: USER_DETAIL_CLEAR };
}