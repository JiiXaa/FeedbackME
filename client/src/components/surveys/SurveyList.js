import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveysFetchedFromDB.reverse().map((fetchedSurvey) => {
      return (
        <div className='card blue-grey darken-1' key={fetchedSurvey._id}>
          <div className='card-content'>
            <span className='card-title'>{fetchedSurvey.title}</span>
            <p className=''>{fetchedSurvey.body}</p>
            <p className='right'>
              Sent on: {new Date(fetchedSurvey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className='card-action'>
            <a>Yes: {fetchedSurvey.yes}</a>
            <a>Yes: {fetchedSurvey.no}</a>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

function mapStateToProps({ surveysFetchedFromDB }) {
  return { surveysFetchedFromDB };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
