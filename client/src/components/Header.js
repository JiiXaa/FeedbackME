import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StripePayments from './StripePayments';

// Hook up component to the redux store: we always import the connect helper from react redux, we define the map state to props function and we pull off the pieces of state we want in the component
class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href='/auth/google'>Login With Google</a>
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
            <a href='/api/logout'>Logout</a>
          </li>,
        ];
    }
  }

  render() {
    // console.log('Props from header', this.props);
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className='left brand-logo'
          >
            FeedbackME
          </Link>
          <ul className='right'>{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  // auth coming from reducers/index.js
  return { auth };
}

export default connect(mapStateToProps)(Header);
