import { FETCH_SURVEYS } from '../actions/types';

export default function (state = [], action) {
  console.log('action comes from surveysReducer.js: ', action);
  switch (action.type) {
    case FETCH_SURVEYS:
      console.log('FETCH_SURVEYS: ', action.payload);
      return action.payload;
    default:
      return state;
  }
}
