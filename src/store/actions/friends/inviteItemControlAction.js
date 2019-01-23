import {
  INVITE_CONTROL_ERROR,
  INVITE_CONTROL_LOADER,
  INVITE_CONTROL_SUCCESS
} from "../actionTypes";
import ErrorHelper from "../../../helpers/ErrorHelper";
import axios from "../../../axios/axios-api";
import FetchService from "../../../services/fetch/FetchService";
import { transformModels } from "./inviteListAction";
import { removeRequest } from "./requests/friendsNewRequestsAction";

export class inviteItemControlAction {
  static asyncFetchByUrl(url, inviteId) {
    return async (dispatch, getState) => {
      dispatch(this.loader());

      const state = getState();
      let { models } = state.inviteList;

      try {
        const { data } = await FetchService.http(axios).get(url);
        dispatch(this.success());
        dispatch(transformModels(models.filter(model => +model.invite.id !== +inviteId)));
        dispatch(removeRequest());
      } catch (e) {
        dispatch(this.error(ErrorHelper.getMessageByError(e)));
      }
    }
  }

  static refuse(inviteId) {
    return this.asyncFetchByUrl(`/user/friend/invite/refuse/${inviteId}`, inviteId);
  }

  static accept(inviteId) {
    return this.asyncFetchByUrl(`/user/friend/invite/accept/${inviteId}`, inviteId);
  }

  static loader() {
    return { type: INVITE_CONTROL_LOADER }
  }

  static error(error) {
    return { type: INVITE_CONTROL_ERROR, payload: error }
  }

  static success() {
    return { type: INVITE_CONTROL_SUCCESS }
  }
}