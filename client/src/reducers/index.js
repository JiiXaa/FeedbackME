import { combineReducers } from 'redux';
import authReducer from './authReducer';
import surveyReducer from './surveyReducer';

export default combineReducers({
  auth: authReducer,
  survey: surveyReducer,
});
