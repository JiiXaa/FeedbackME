import React from 'react';
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { reviewSurvey } from '../../actions';
import { connect } from 'react-redux';
import formInputs from './formInputs';

import styled from 'styled-components';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <StyledInputContainer>
      <StyledFormLabel htmlFor={props.id || props.name}>
        {label}
      </StyledFormLabel>
      <StyledFormInput {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledRequiredInputError>{meta.error}</StyledRequiredInputError>
      ) : null}
    </StyledInputContainer>
  );
};

const renderInputs = () => {
  return formInputs.map(({ label, name }) => {
    return (
      <MyTextInput
        key={name}
        label={label}
        name={name}
        type='text'
        placeholder=''
      />
    );
  });
};

const SurveyForm = ({ survey, reviewSurvey, setShowReview }) => {
  return (
    <StyledFormContainer>
      <h2>Submit Survey and review your inputs in next step.</h2>
      <small>
        Make sure your Recipient List has valid emails and they are comma
        separated
      </small>
      <Formik
        initialValues={{
          title: survey?.title || '',
          subject: survey?.subject || '',
          body: survey?.body || '',
          recipients: survey?.recipients || '',
        }}
        validationSchema={Yup.object({
          title: Yup.string().required('Required'),
          subject: Yup.string().required('Required'),
          body: Yup.string().required('Required'),
          recipients: Yup.array()
            .transform(function (value, originalValue) {
              if (this.isType(value) && value !== null) {
                return value;
              }
              return originalValue ? originalValue.split(/[\s,]+/) : [];
            })
            .of(
              Yup.string().email(({ value }) => `${value} is not a valid email`)
            )
            .required('Required'),
        })}
        onSubmit={(values) => {
          // action creates obj with values from form inputs
          reviewSurvey(values);
          // goes to review component
          setShowReview(true);
        }}
        validateOnChange={false}
      >
        <StyledFormikForm>
          {renderInputs()}
          <StyledBottomBtnContainer>
            <StyledLink to='/surveys'>Cancel</StyledLink>
            {/* We use button instead of Link to get the option to call an action creator or do some work before the navigation actually occurs (with Link tag, we instantly navigate away with no prior checks.) */}
            <StyledNextBtn type='submit'>
              Next<i className='material-icons right'>done</i>
            </StyledNextBtn>
          </StyledBottomBtnContainer>
        </StyledFormikForm>
      </Formik>
    </StyledFormContainer>
  );
};

function mapStateToProps(state) {
  // survey coming from reducers/index.js
  return { survey: state.survey };
}

export default connect(mapStateToProps, { reviewSurvey })(SurveyForm);

const StyledFormContainer = styled.div`
  padding: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    color: rgba(59, 63, 66, 0.8);
    margin: 0.5rem;
  }

  small {
    font-size: 0.9rem;
    color: #fc4f4f;
  }
`;

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const StyledFormikForm = styled(Form)`
  max-width: 1170px;
  width: 100%;
`;

const StyledFormInput = styled.input`
  padding: 1.5rem 0;
  font-size: 1.2rem;
  outline: none;
  border: none;
  border-bottom: 1px dashed rgba(59, 63, 66, 0.8);
`;

const StyledFormLabel = styled.label`
  font-weight: 400;
  color: rgba(59, 63, 66, 0.5);
`;

const StyledRequiredInputError = styled.small`
  margin: 0.3rem;
  color: red;
`;

const StyledBottomBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledNextBtn = styled.button`
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

const StyledLink = styled(Link)`
  padding: 0.5rem 1.8rem;
  display: flex;
  align-items: center;
  background-color: #df6a6a;
  color: rgba(59, 63, 66, 0.5);
  border: none;
  color: whitesmoke;
  border-radius: 2px;
  text-decoration: none;
  transition: 0.2s ease-out;

  &:hover {
    background-color: #ef6c57;
  }

  i {
    font-size: 2rem;
    color: white;
  }
`;
