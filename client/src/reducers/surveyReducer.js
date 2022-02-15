import { REVIEW_SURVEY } from '../actions/types';

const surveyReducer = (state = null, action) => {
  console.log('action comes from surveyReducer.js: ', action);
  switch (action.type) {
    case REVIEW_SURVEY:
      console.log('REVIEW_SURVEY: ', action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default surveyReducer;
