import { LOADER_OFF, LOADER_ON } from "../../actions/actionTypes";

const initialState = {
  loader: false,
};

export default function loaderReducer(state = initialState, action) {
  switch (action.type) {
    case LOADER_ON:
      return { loader: true };
    case LOADER_OFF:
      return { loader: false };
    default:
      return state;
  }
}