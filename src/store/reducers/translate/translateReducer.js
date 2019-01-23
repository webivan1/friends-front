import {
  TRANSLATE_CHANGE,
  TRANSLATE_LOADER
} from "../../actions/actionTypes";

const initialState = {
  locale: 'en',
  loader: true,
  storage: {},
  data: {},
  languages: [
    {
      lang: 'en',
      label: 'English'
    },
    {
      lang: 'ru',
      label: 'Русский'
    },
  ]
};

export default function translateReducer(state = initialState, action) {
  switch (action.type) {
    case TRANSLATE_CHANGE:
      return {...state, loader: false, ...action.payload};
    case TRANSLATE_LOADER:
      return {...state, loader: true};
    default:
      return state;
  }
}