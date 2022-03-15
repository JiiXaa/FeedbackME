// class SurveyNew extends React.Component {
//   state = { showReview: false };

//   render() {
//     if (this.state.showReview)
//       return (
//         <SurveyReview
//           setShowReview={(showReview) => this.setState({ showReview })}
//         />
//       );
//     else
//       return (
//         <SurveyForm
//           setShowReview={(showReview) => this.setState({ showReview })}
//         />
//       );
//   }
// }

// export default SurveyNew;

// SurveyNew.js

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyFormReview';
import { reviewSurvey } from '../../actions';

const SurveyNew = () => {
  const dispatch = useDispatch();
  const [showReview, setShowReview] = useState(false);
  const showReviewForm = () => setShowReview(true);

  useEffect(() => {
    return () => {
      dispatch(reviewSurvey(null));
    };
  });

  if (showReview)
    return <SurveyReview setShowReview={() => setShowReview(false)} />;

  return <SurveyForm showReviewForm={showReviewForm} />;
};

export default SurveyNew;
