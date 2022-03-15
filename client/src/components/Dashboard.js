import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
import { fetchSurveys } from '../actions';
import { connect } from 'react-redux';

import styled from 'styled-components';

class Dashboard extends Component {
  state = {
    sortType: 'desc',
    surveysList: [],
  };

  componentDidMount() {
    this.props.fetchSurveys().then(() => {
      this.setState({
        surveysList: this.props.surveysFetchedFromDB.reverse(),
      });
    });
  }

  sortByDate() {
    const { sortType, surveysList } = this.state;

    let sorted = surveysList.sort(function (a, b) {
      if (sortType === 'asc') {
        return new Date(b.dateSent) - new Date(a.dateSent);
      } else {
        return new Date(a.dateSent) - new Date(b.dateSent);
      }
    });

    this.setState({
      sortType: this.state.sortType === 'asc' ? 'desc' : 'asc',
      surveysList: sorted,
    });
  }

  sortByPositiveFeedback() {
    const { sortType, surveysList } = this.state;

    let sorted = surveysList.sort(function (a, b) {
      if (sortType === 'asc') {
        return b.yes - a.yes;
      } else {
        return a.yes - b.yes;
      }
    });

    this.setState({
      sortType: this.state.sortType === 'asc' ? 'desc' : 'asc',
      surveysList: sorted,
    });
  }

  render() {
    return (
      <StyledContainerWrapper>
        <StyledDashboardWrapper>
          <StyledButtonsWrapper>
            <StyledSortingBtn onClick={() => this.sortByDate()}>
              Sort by date
            </StyledSortingBtn>
            <StyledSortingBtn onClick={() => this.sortByPositiveFeedback()}>
              Sort by positive
            </StyledSortingBtn>
          </StyledButtonsWrapper>
          <StyledStripeDesc>
            <h2>
              To be able to add credits, make sure to use these card details:
            </h2>
            <p>4242 - 4242 - 4242 - 4242</p>
            <p>any future date and random 3 digit CVV</p>
            <p>
              Stripe works in test mode, and that is why only accepts this card
            </p>
          </StyledStripeDesc>
          <SurveyList dataFetched={this.state.surveysList} />
          <StyledLink to='/surveys/new'>
            <i className='material-icons'>add</i>
          </StyledLink>
        </StyledDashboardWrapper>
      </StyledContainerWrapper>
    );
  }
}

function mapStateToProps({ surveysFetchedFromDB }) {
  return { surveysFetchedFromDB };
}

export default connect(mapStateToProps, { fetchSurveys })(Dashboard);

const StyledContainerWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const StyledDashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5.2rem;
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledSortingBtn = styled.button`
  cursor: pointer;
  padding: 1rem 2rem;
  border: none;
`;

const StyledLink = styled(Link)`
  position: fixed;
  bottom: 5rem;
  right: 5rem;
  padding: 1rem;
  background-color: #dd4a48;
  border: 2px solid #f9e4d4;
  border-radius: 50%;
  margin: 1rem;
  font-size: 1.5rem;
  font-weight: 100;
  text-decoration: none;
  transition: 0.2s ease-out;
  i {
    font-size: 2rem;
    color: white;
  }

  &:hover {
    background-color: #ef6c57;
  }
`;

const StyledStripeDesc = styled.div`
  text-align: center;
  padding: 1rem;
  margin-top: 2rem;
  background-color: #fff1b3;
  width: 50%;
  border-radius: 10px;

  h2 {
    color: #ca4834;
    text-decoration: underline;
  }
`;
