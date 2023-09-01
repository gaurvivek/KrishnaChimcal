import {
  REDUX_LOAD,
  DATA_LOADING_REDUX,
  STORED_TIMESTAMP,
  FETCH_EMP_LIST,
  FETCH_USER_DATA,
  FETCH_AUTH_DATA,
  FETCH_COAL_LIST,
  FETCH_STONE_LIST,
} from '../constants/action-types';

const initialState = {
  reduxLoadFlag: false,
  loadingFlag: false,
  timestamp: '',
  empList: [],
  userdata: {},
  authData: {},
  coalList: [],
  stoneList: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case REDUX_LOAD:
      const reduxLoadFlag = action.payload;
      return {
        ...state,
        reduxLoadFlag,
      };
    case DATA_LOADING_REDUX:
      const loadingFlag = action.payload;
      return {
        ...state,
        loadingFlag,
      };
    case STORED_TIMESTAMP:
      const timestamp = action.payload;
      return {
        ...state,
        timestamp,
      };
    // OTHER REDUX METHODS
    case FETCH_EMP_LIST:
      const empList = action.payload;
      return {
        ...state,
        empList,
      };
    case FETCH_USER_DATA:
      const userdata = action.payload;
      return {
        ...state,
        userdata,
      };
    case FETCH_AUTH_DATA:
      const authData = action.payload;
      return {
        ...state,
        authData,
      };
    case FETCH_COAL_LIST:
      const coalList = action.payload;
      return {
        ...state,
        coalList,
      };
    case FETCH_STONE_LIST:
      const stoneList = action.payload;
      return {
        ...state,
        stoneList,
      };
    default:
      break;
  }
  return state;
}
export default rootReducer;
