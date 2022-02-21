import React, { Component } from 'react';
import styled from 'styled-components';

class SurveyList extends Component {
  renderSurveys() {
    // console.log('ten', this.props.dataFetched);
    return this.props.dataFetched.map((fetchedSurvey) => {
      return (
        <StyledSurveyCard key={fetchedSurvey._id}>
          <StyledSurveyCardDetailsWrapper>
            <StyledSurveyCardDetails>
              <h1 className='card-title'>{fetchedSurvey.title}</h1>
              <p className=''>{fetchedSurvey.body}</p>
              <p className='right'>
                Sent on: {new Date(fetchedSurvey.dateSent).toLocaleDateString()}
              </p>
            </StyledSurveyCardDetails>
          </StyledSurveyCardDetailsWrapper>
          <StyledSurveyResponseContainer>
            <a>Yes: {fetchedSurvey.yes}</a>
            <a>No: {fetchedSurvey.no}</a>
          </StyledSurveyResponseContainer>
        </StyledSurveyCard>
      );
    });
  }

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

export default SurveyList;

const StyledSurveyCardWrapper = styled.div``;

const StyledSurveyCard = styled.div`
  border-radius: 5px;
  margin: 2rem;
  background-color: #cdb699;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const StyledSurveyCardDetailsWrapper = styled.div`
  padding: 2rem;
`;

const StyledSurveyCardDetails = styled.div`
  h1 {
    color: whitesmoke;
    border-bottom: 1px dashed rgb(59, 63, 66);
  }
`;

const StyledSurveyResponseContainer = styled.div`
  background-color: whitesmoke;
  padding-top: 0.8rem;
  border-radius: 0 0 5px 5px;
`;
