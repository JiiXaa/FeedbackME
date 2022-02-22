import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import formInputs from './formInputs';
import * as actions from '../../actions';

import styled from 'styled-components';

// this component shows users their form inputs for review
const SurveyReview = ({
  storeSurveyReviewInputs,
  setShowReview,
  submitSurvey,
}) => {
  const navigate = useNavigate();

  const reviewInputs = formInputs.map(({ name, label }) => {
    return (
      <StyledReviewInputsContainer key={name}>
        <label>{label}</label>
        {/* It loops over every review input and render value for each field from
        the store. */}
        <StyledReviewInput>{storeSurveyReviewInputs[name]}</StyledReviewInput>
      </StyledReviewInputsContainer>
    );
  });

  return (
    <StyledReviewContainer>
      <h4>Please confirm your entries</h4>
      {reviewInputs}
      <StyledReviewBtnsContainer>
        <StyledBackBtn onClick={() => setShowReview(false)}>Back</StyledBackBtn>
        <StyledSendBtn
          // submitSurvey comes from actions, and we pass in the props
          onClick={() => submitSurvey(storeSurveyReviewInputs, navigate)}
        >
          Send Survey <i className='material-icons right'>email</i>
        </StyledSendBtn>
      </StyledReviewBtnsContainer>
    </StyledReviewContainer>
  );
};
function mapStateToProps(state) {
  // survey comes from reducers/index.js
  return { storeSurveyReviewInputs: state.survey };
}

export default connect(mapStateToProps, actions)(SurveyReview);

const StyledReviewContainer = styled.div`
  max-width: 800px;
  padding: 10rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h4 {
    color: rgba(59, 63, 66, 0.8);
  }
`;

const StyledReviewBtnsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StyledReviewInputsContainer = styled.div`
  padding: 1rem;
  width: 100%;

  label {
    color: rgba(59, 63, 66, 0.8);
  }
`;

const StyledReviewInput = styled.div`
  padding: 1rem 0;
  border-bottom: 1px dashed grey;
`;

const StyledSendBtn = styled.button`
  font-size: 1rem;
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
  color: whitesmoke;
  background-color: #74b49b;
  border-radius: 2px;
  transition: 0.2s ease-out;

  &:hover {
    background-color: #a7d7c5;
  }

  i {
    padding-left: 0.5rem;
  }
`;

const StyledBackBtn = styled.button`
  font-size: 1rem;
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
  color: whitesmoke;
  background-color: #df6a6a;
  border-radius: 2px;
  transition: 0.2s ease-out;

  &:hover {
    background-color: #ef6c57;
  }

  i {
    padding-left: 0.5rem;
  }
`;
