import { FETCH_USER } from '../actions/types';

// we set up first state when app load to null because we dont know if user is logged in or not, if logged in we use that data/USER MODEL if not we set state to false
export default function authReducer(state = null, action) {
  console.log('action comes from authReducer.js: ', action);
  switch (action.type) {
    case FETCH_USER:
      console.log('FETCH_USER: ', action.payload);
      return action.payload || false;
    default:
      return state;
  }
}
