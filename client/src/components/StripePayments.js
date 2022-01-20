import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

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
        <button className='btn'>Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(StripePayments);
