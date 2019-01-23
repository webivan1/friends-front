import {
  USER_LOGIN,
  USER_LOGOUT
} from '../../actions/actionTypes';

const initialState = {
  isGuest: true,
  loader: true,
  user: null,
  referer: null,
  redirect: null
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {...state, loader: false, isGuest: false, user: action.payload, redirect: null};
    case USER_LOGOUT:
      return {...state, loader: false, isGuest: true, user: null, ...action.payload};
    default:
      return state;
  }
}