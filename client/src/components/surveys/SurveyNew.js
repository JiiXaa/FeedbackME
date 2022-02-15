import React from 'react';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyFormReview';

class SurveyNew extends React.Component {
  state = { showReview: false };

  render() {
    if (this.state.showReview)
      return (
        <SurveyReview
          setShowReview={(showReview) => this.setState({ showReview })}
        />
      );
    else
      return (
        <SurveyForm
          setShowReview={(showReview) => this.setState({ showReview })}
        />
      );
  }
}

export default SurveyNew;
