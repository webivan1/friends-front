import FetchService from "../../../../services/fetch/FetchService";
import AuthService from "../../../../services/auth/AuthService";
import axios from "../../../../axios/axios-api";
import EchoServer from "../../../../echo-server/EchoServer";
import { NEW_FRIEND_REQUEST_CHANGE, NEW_FRIEND_REQUEST_RESULT } from "../../actionTypes";

export function getRequests() {
  return async (dispatch, getState) => {
    try {
      const { data } = await FetchService.http(axios).get(`/user/friends-list/total-new-requests`);
      dispatch(success(data.total));
    } catch (e) {
      console.error(e);
    }
  }
}

function success(total) {
  return { type: NEW_FRIEND_REQUEST_RESULT, payload: +total }
}

function addNewRequest() {
  return { type: NEW_FRIEND_REQUEST_CHANGE, payload: 1 };
}

export function removeRequest() {
  return { type: NEW_FRIEND_REQUEST_CHANGE, payload: -1 };
}

export function listenNewRequests() {
  return (dispatch, getState) => {
    const state = getState();
    const { user } = state.user;

    const token = AuthService.getInstance().getToken();
    const channelName = `hello.${user.id}`;
    const echo = EchoServer(token);

    echo.private(channelName).on('invite', data => {
      dispatch(addNewRequest());
    });
  }
}

export function unsubscribeNewRequests(userId) {
  const token = AuthService.getInstance().getToken();
  EchoServer(token).leave(`hello.${userId}`);
}