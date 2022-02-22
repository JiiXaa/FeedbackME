import React, { Component } from 'react';
import styled from 'styled-components';

class SurveyList extends Component {
  renderSurveys() {
    return this.props.dataFetched.map((fetchedSurvey) => {
      return (
        <StyledSurveyCard key={fetchedSurvey._id}>
          <StyledSurveyCardDetailsWrapper>
            <StyledSurveyCardDetails>
              <h1>{fetchedSurvey.title}</h1>
              <p>{fetchedSurvey.body}</p>
              <p>
                Sent on: {new Date(fetchedSurvey.dateSent).toLocaleDateString()}
              </p>
            </StyledSurveyCardDetails>
          </StyledSurveyCardDetailsWrapper>
          <StyledSurveyResponseContainer>
            <StyledSurveyResponseYesOrNo yes>
              Yes: {fetchedSurvey.yes}
            </StyledSurveyResponseYesOrNo>
            <StyledSurveyResponseYesOrNo>
              No: {fetchedSurvey.no}
            </StyledSurveyResponseYesOrNo>
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

const StyledSurveyResponseYesOrNo = styled.div`
  margin: 0;
  padding: 0.5rem 3.2rem;
  background-color: ${(props) => (props.yes ? '#D3ECA7' : '#FC4F4F')};
  color: rgba(59, 63, 66, 1);
  font-weight: bold;
`;

const StyledSurveyCard = styled.div`
  width: 60%;
  margin: 2rem auto;
  border-radius: 5px;
  background-color: #cdb699;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const StyledSurveyCardDetailsWrapper = styled.div`
  padding: 2rem;
`;

const StyledSurveyCardDetails = styled.div`
  h1 {
    font-size: 2.2rem;
    color: #efefef;
    padding-bottom: 0.5rem;
    border-bottom: 1px dashed rgb(59, 63, 66);
  }

  p {
    color: rgba(59, 63, 66, 1);
    font-size: 1.3rem;

    &:last-child {
      font-size: 0.9rem;
      font-style: italic;
      color: rgba(59, 63, 66, 0.6);
      text-align: end;
    }
  }
`;

const StyledSurveyResponseContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: whitesmoke;
  border-radius: 0 0 5px 5px;
`;
