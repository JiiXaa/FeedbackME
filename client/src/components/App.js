import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import Thanks from './surveys/Thanks';

import GlobalStyle from '../globalStyles';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/surveys' element={<Dashboard />} />
          <Route path='/surveys/new' element={<SurveyNew />} />
          <Route path='/:surveyId/:choice' element={<Thanks />} />
        </Routes>
      </>
    );
  }
}

export default connect(null, actions)(App);
