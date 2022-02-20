import React, { Component } from 'react';

class SurveyList extends Component {
  renderSurveys() {
    // console.log('ten', this.props.dataFetched);
    return this.props.dataFetched.map((fetchedSurvey) => {
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
            <a>No: {fetchedSurvey.no}</a>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

export default SurveyList;
