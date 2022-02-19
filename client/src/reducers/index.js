import { combineReducers } from 'redux';
import authReducer from './authReducer';
import surveyReducer from './surveyReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
  auth: authReducer,
  survey: surveyReducer,
  surveysFetchedFromDB: surveysReducer,
});
