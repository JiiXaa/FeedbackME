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

    // call the sort method on the surveys array
    // surveys = surveys.sort(
    // make sure the "dateSent" var is a Js Date Object
    // and is valid, we can call getTime() to get a number
    // for the sort comparison
    // (a, b) => new Date(b.dateSent) - new Date(a.dateSent)
    // );
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
  // sortByDateOld() {
  //   const sortedSurveys = this.props.surveysFetchedFromDB.sort(
  //     (a, b) => b.dateSent - a.dateSent
  //   );
  //   console.log(sortedSurveys);
  //   console.log(this.props.surveysFetchedFromDB);
  // }

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
          <SurveyList dataFetched={this.state.surveysList} />
          <div className='fixed-action-btn'>
            <Link to='/surveys/new' className='btn-floating btn-large red'>
              <i className='material-icons'>add</i>
            </Link>
          </div>
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
  padding-top: 5.2rem;
  border: 2px solid red;
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
