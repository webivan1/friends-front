import axios from '../../../../axios/axios-api';
import FetchService from "../../../../services/fetch/FetchService";
import {
  PROFILE_GAMES_FETCHED,
  PROFILE_GAMES_UPDATE_FAIL,
  PROFILE_GAMES_UPDATE_SUCCESS,
  PROFILE_GAMES_UPDATE,
  PROFILE_GAMES_CHANGE_VALUES
} from "../../actionTypes";
import ErrorHelper from "../../../../helpers/ErrorHelper";

export function fetchGames() {
  return async (dispatch, getState) => {
    try {
      const allGames = await getAllGames();
      const myGames = await getOwnGames();

      dispatch(isLoaded(allGames, myGames));
    } catch (e) {
      console.error(e);
    }
  }
}

export function updateGames(gameList) {
  return async (dispatch, getState) => {
    dispatch(setUpdateLoader());

    const games = gameList.map(({ value }) => value);

    try {
      const { data } = await FetchService.http(axios)
        .post(`/user/form/games`, { games });

      dispatch(success(data.message))
    } catch (e) {
      dispatch(error(ErrorHelper.getMessageByError(e)));
    }
  }
}

export function changeGames(values) {
  return { type: PROFILE_GAMES_CHANGE_VALUES, payload: values }
}

function setUpdateLoader() {
  return { type: PROFILE_GAMES_UPDATE }
}

function error(message) {
  return { type: PROFILE_GAMES_UPDATE_FAIL, payload: message }
}

function success(message) {
  return { type: PROFILE_GAMES_UPDATE_SUCCESS, payload: message }
}

function isLoaded(allGames, myGames) {
  return { type: PROFILE_GAMES_FETCHED, payload: { allGames, myGames } }
}

function getAllGames() {
  return axios.get(`/list-games`)
    .then(response => response.data);
}

function getOwnGames() {
  return FetchService.http(axios).get(`/user/form/games`)
    .then(response => response.data);
}