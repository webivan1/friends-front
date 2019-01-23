import OnlineUserService from "@/services/online-users/OnlineUserService";
import { ONLINE_USERS_UPDATE, ONLINE_USERS_LIVE } from "@/store/actions/actionTypes";
import FetchService from "@/services/fetch/FetchService";
import axios from '@/axios/axios-api';

export class onlineUserAction {
  static register(userId) {
    return (dispatch, getState) => {
      const { collection } = getState().onlineUser;
      const model = new OnlineUserService(userId);
      const newCollection = collection.add(model);

      newCollection && dispatch({ type: ONLINE_USERS_UPDATE, payload: newCollection });

      return model;
    }
  }

  static live() {
    return dispatch => {
      return FetchService.http(axios).get('/ping')
        .then(({ data }) => {
          dispatch({ type: ONLINE_USERS_LIVE, payload: (new Date).getTime() + (60 * 1000) });
          return data;
        });
    }
  }
}