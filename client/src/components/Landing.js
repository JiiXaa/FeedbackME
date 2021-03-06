import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import landingImg from '../img/l1-transparent.png';

class Landing extends Component {
  renderContent() {
    return (
      <div>
        <StyledLogoArticle>
          <h1>We provide Customer Satisfaction Surveys</h1>
          <p>Send unlimited surveys with us cheap!</p>
          <div>
            {this.props.auth ? (
              <StyledToDashboardBtn to={this.props.auth ? '/surveys' : '/'}>
                Go To Dashboard
              </StyledToDashboardBtn>
            ) : (
              ''
            )}
          </div>
        </StyledLogoArticle>
        <StyledMainWrapper>
          <StyledMain>
            <img src={landingImg} alt='' />
            <StyledHeadingsContainer>
              <h1>Wondered if you need a customer satisfaction survey?</h1>
              <p>
                A customer satisfaction survey gathers feedback from your
                current or past customers. You just need to provide a list of
                emails, a description, and we do the rest!
              </p>
            </StyledHeadingsContainer>
            <StyledHeadingsContainer>
              <h1>What this is about? and how does it work?</h1>

              <p>
                A simple survey about your services from your customers with
                responses indicating whether they were happy or not! Send
                <span>UNLIMITED</span>
                emails and we will gather the responses for you.
              </p>
            </StyledHeadingsContainer>
            <StyledHeadingsContainer>
              <h1>How to create your customer satisfaction survey?</h1>

              <p>
                Simply create a new survey from your dashboard and add your
                customers emails. Make sure you're specific with that what you
                want to ask! You could ask "How was your experience with us?" or
                "Did you find our staff friendly?" This can help to give you a
                broad overview of how your customers feel about the service you
                supplied.
              </p>
            </StyledHeadingsContainer>
            <StyledLoginBtn href='/auth/google'>Start Here</StyledLoginBtn>
          </StyledMain>
        </StyledMainWrapper>
        <StyledFooter>
          <StyledCopyrightBtn href='https://www.linkedin.com/in/tomasz-ostroga-9753301a3/'>
            <span>2022</span> JiiXaa ??
          </StyledCopyrightBtn>
        </StyledFooter>
      </div>
    );
  }

  render() {
    return <article>{this.renderContent()}</article>;
  }
}

function mapStateToProps({ auth }) {
  // auth coming from reducers/index.js
  return { auth };
}

export default connect(mapStateToProps)(Landing);

const StyledLogoArticle = styled.div`
  color: whitesmoke;
  padding-bottom: 4rem;
  padding-top: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #bb6464;
  margin-bottom: 3rem;
  h1 {
    font-size: 2rem;
  }
  p {
    position: relative;
    top: -2rem;
    font-size: 1.8rem;
  }
`;

const StyledToDashboardBtn = styled(Link)`
  background-color: #3b3f42;
  border: 2px solid whitesmoke;
  color: whitesmoke;
  padding: 1.3rem;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 600;
  transition: 0.2s ease-out;
  &:hover {
    background-color: whitesmoke;
    color: #3b3f42;
    border: 2px solid #3b3f42;
  }
`;

const StyledMainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 800px;

  img {
    width: 80%;
    margin-bottom: 2rem;
  }
`;

const StyledHeadingsContainer = styled.div`
  line-height: 1.8;
  max-width: 550px;
  margin-bottom: 2rem;
  span {
    background-color: #bb6464;
    padding: 0.4rem;
    margin: 0.3rem;
    color: whitesmoke;
  }
`;

const StyledFooter = styled.div`
  background-color: #bb6464;
  padding: 2rem;
  padding-right: 5rem;
  text-align: end;
  margin-top: 3rem;
`;

const StyledCopyrightBtn = styled.a`
  font-size: 1.1rem;
  font-weight: bold;
  text-decoration: none;
  span {
    color: rgba(59, 63, 66, 0.5);
  }

  &:visited,
  &:link {
    color: whitesmoke;
    &:hover {
      color: rgba(59, 63, 66, 0.5);
    }
  }
`;

const StyledLoginBtn = styled.a`
  border-radius: 10px;
  padding: 1.5rem;
  font-size: 1.7rem;
  background-color: #227c79;
  text-decoration: none;
  transition: background-color 0.5s ease-out;

  &:hover {
    background-color: #31a8a4;
  }
  &:visited,
  &:link {
    color: #fff;
  }
`;
