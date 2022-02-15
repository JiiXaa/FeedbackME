import React from 'react';
import { connect } from 'react-redux';
import formInputs from './formInputs';
import * as actions from '../../actions';

// this component shows users their form inputs for review
const SurveyReview = ({ surveyReviewInputs, setShowReview, submitSurvey }) => {
  const reviewInputs = formInputs.map(({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        {/* It loops over every review input and render value for each field from
        the store. */}
        <div>{surveyReviewInputs[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewInputs}
      <button
        className='yellow darken-3 white-text btn-flat'
        onClick={() => setShowReview(false)}
      >
        Back
      </button>
      <button
        // submitSurvey comes from actions, and we pass it to the props
        onClick={() => submitSurvey(formInputs)}
        className='green btn-flat right white-text'
      >
        Send Survey <i className='material-icons right'>email</i>
      </button>
    </div>
  );
};
function mapStateToProps(state) {
  // survey comes from reducers/index.js
  return { surveyReviewInputs: state.survey };
}

export default connect(mapStateToProps, actions)(SurveyReview);
