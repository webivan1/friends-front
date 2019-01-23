import {
  PEOPLE_LIST_LOADER_LIST,
  PEOPLE_LIST_QUERY,
  PEOPLE_LIST_ERROR
} from '../../actions/actionTypes';

const initialState = {
  loaderList: true,
  url: null,
  models: [],
  formData: {},
  totalItems: 0,
  lastPage: 0,
  currentPage: 1,
  perPage: 0,
  nextPageUrl: null,
  prevPageUrl: null,
  firstPageUrl: null,
  lastPageUrl: null,
  sortAttributes: [],
  params: {},
  error: null,
};

export default function peopleListReducer(state = initialState, action) {
  switch (action.type) {
    case PEOPLE_LIST_LOADER_LIST:
      return {...state, error: null, loaderList: true};
    case PEOPLE_LIST_QUERY:
      return {...state, error: null, loaderList: false, ...action.payload};
    case PEOPLE_LIST_ERROR:
      return {...state, error: action.payload, loaderList: false};
    default:
      return state;
  }
}