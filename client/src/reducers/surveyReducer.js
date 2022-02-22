import { REVIEW_SURVEY } from '../actions/types';

const surveyReducer = (state = null, action) => {
  switch (action.type) {
    case REVIEW_SURVEY:
      // console.log('REVIEW_SURVEY: ', action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default surveyReducer;
