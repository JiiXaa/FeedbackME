import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

import styled from 'styled-components';

class StripePayments extends Component {
  render() {
    return (
      <StripeCheckout
        name='FeedbackMe'
        description='pay £5 get 5 credits'
        token={(token) => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        amount={500}
        currency='GBP'
      >
        <StyledAddCreditsBtn>Add Credits</StyledAddCreditsBtn>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(StripePayments);

const StyledAddCreditsBtn = styled.button`
  cursor: pointer;
  padding: 0.6rem 1rem;
  background-color: #ebf2f2;
  border: 1px solid #3b3f42;
  transition: 0.2s ease-out;
  &:hover {
    background-color: #3b3f42;
    color: #ebf2f2;
    border: 1px solid #ebf2f2;
  }
`;
