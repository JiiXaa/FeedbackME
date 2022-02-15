import axios from 'axios';
import { FETCH_USER } from './types';
import { REVIEW_SURVEY } from './types';

// redux thunk sees we return function and automatically call it with dispatch
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};
// helper function used in components/StripePayments.js
export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

// action for a survey review FORMIK/YUP
export const reviewSurvey = (survey) => {
  return { type: REVIEW_SURVEY, payload: survey };
};

// action for Submitting Survey Form (SurveyFormReview)
export const submitSurvey = (values, navigate) => async (dispatch) => {
  const res = await axios.post('/api/surveys', values);

  navigate('/surveys');

  dispatch({ type: FETCH_USER, payload: res.data });
};
