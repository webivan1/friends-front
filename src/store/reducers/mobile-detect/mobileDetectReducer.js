

import MobileDetectService from "../../../services/mobile-detect/MobileDetectService";
import { MOBILE_DETECT_CHANGE } from "../../actions/actionTypes";

const initialState = {
  device: new MobileDetectService()
};

export default function mobileDetectReducer(state = initialState, action) {
  switch (action.type) {
    case MOBILE_DETECT_CHANGE:
      return { device: new MobileDetectService() };
    default:
      return state;
  }
}

