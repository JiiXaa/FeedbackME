import React from 'react';
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { reviewSurvey } from '../../actions';
import { connect } from 'react-redux';
import formInputs from './formInputs';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className='text-input' {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='error red-text'>{meta.error}</div>
      ) : null}
    </>
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
    <>
      <h3>Submit a survey!</h3>
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
        <Form>
          {renderInputs()}
          <Link to='/surveys' className='red btn-flat left white-text'>
            Cancel
          </Link>
          {/* We use button instead of Link to get the option to call an action creator or do some work before the navigation actually occurs (with Link tag, we instantly navigate away with no prior checks.) */}
          <button className='teal btn-flat right white-text' type='submit'>
            Next<i className='material-icons right'>done</i>
          </button>
        </Form>
      </Formik>
    </>
  );
};

function mapStateToProps(state) {
  // survey coming from reducers/index.js
  return { survey: state.survey };
}

export default connect(mapStateToProps, { reviewSurvey })(SurveyForm);
