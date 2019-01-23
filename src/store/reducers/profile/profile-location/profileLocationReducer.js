import {
  PROFILE_LOCATION_FETCH_COMPLETED,
  PROFILE_LOCATION_UPDATE,
  PROFILE_LOCATION_UPDATED,
  RESET_STATE
} from "../../../actions/actionTypes";

const initialState = {
  fetchLoader: true,
  coordinates: [],
  locations: [],
  updateLoader: false,
};

export default function profileLocationReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOCATION_FETCH_COMPLETED:
      return {...state, fetchLoader: false, ...action.payload};
    case PROFILE_LOCATION_UPDATE:
      return {...state, updateLoader: true};
    case PROFILE_LOCATION_UPDATED:
      return {...state, updateLoader: false, ...action.payload};
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}