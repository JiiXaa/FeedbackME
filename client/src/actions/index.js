import axios from 'axios';
import { FETCH_USER, REVIEW_SURVEY, FETCH_SURVEYS } from './types';

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
// used useNavigate hook to navigate to dashboard after making post to our server. (useNavigate is passed in SurveyFormReview)
export const submitSurvey = (values, navigate) => async (dispatch) => {
  const res = await axios.post('/api/surveys', values);
  navigate('/surveys');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
