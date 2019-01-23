import {
  PROFILE_GAMES_FETCHED,
  PROFILE_GAMES_CHANGE_VALUES,
  PROFILE_GAMES_UPDATE,
  PROFILE_GAMES_UPDATE_SUCCESS,
  PROFILE_GAMES_UPDATE_FAIL,
  RESET_STATE,
} from "../../../actions/actionTypes";

const initialState = {
  fetchLoader: true,
  allGames: [],
  myGames: [],
  updateLoader: false,
  success: null,
  error: null
};

export default function profileGamesReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_GAMES_FETCHED:
      return {...state, fetchLoader: false, ...action.payload};
    case PROFILE_GAMES_CHANGE_VALUES:
      return {...state, myGames: action.payload, success: null, error: null};
    case PROFILE_GAMES_UPDATE:
      return {...state, updateLoader: true, success: null, error: null};
    case PROFILE_GAMES_UPDATE_SUCCESS:
      return {...state, updateLoader: false, success: action.payload, error: null};
    case PROFILE_GAMES_UPDATE_FAIL:
      return {...state, updateLoader: false, success: null, error: action.payload};
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}