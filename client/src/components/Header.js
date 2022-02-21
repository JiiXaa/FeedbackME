import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StripePayments from './StripePayments';

import styled from 'styled-components';

// Hook up component to the redux store: we always import the connect helper from react redux, we define the map state to props function and we pull off the pieces of state we want in the component
class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <StyledLoginBtn href='/auth/google'>
              Login With Google
            </StyledLoginBtn>
          </li>
        );
      default:
        return [
          <li key='1'>
            <StripePayments />
          </li>,
          <li key='2' style={{ margin: '0 10px' }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key='3'>
            <StyledLoginBtn href='/api/logout'>Logout</StyledLoginBtn>
          </li>,
        ];
    }
  }

  render() {
    // console.log('Props from header', this.props);
    return (
      <StyledWrapper>
        <StyledLink to={this.props.auth ? '/surveys' : '/'}>
          <i className='material-icons right'>leaderboard</i>FeedbackME
        </StyledLink>
        <UlWrapper>{this.renderContent()}</UlWrapper>
      </StyledWrapper>
    );
  }
}

function mapStateToProps({ auth }) {
  // auth coming from reducers/index.js
  return { auth };
}

export default connect(mapStateToProps)(Header);

const StyledWrapper = styled.nav`
  position: fixed;
  width: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  padding: 0.5rem;
  background-color: #bb6464;
  color: whitesmoke;
  z-index: 1;
`;

const UlWrapper = styled.ul`
  color: whitesmoke;
  display: flex;
  align-items: center;
  list-style-type: none;
  li:last-child {
    padding-left: 2rem;
  }
`;

const StyledLink = styled(Link)`
  font-size: 1.5rem;
  font-weight: 100;
  display: flex;
  align-items: flex-end;
  color: whitesmoke;
  text-decoration: none;
  margin: 1rem;
  position: relative;
  i {
    font-size: 2rem;
    color: rgba(59, 63, 66, 0.5);
  }
`;

const StyledLoginBtn = styled.a`
  text-decoration: none;
  &:visited,
  &:link {
    color: whitesmoke;
  }
`;
