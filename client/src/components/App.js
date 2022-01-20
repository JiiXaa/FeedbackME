import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/surveys' element={<Dashboard />} />
          <Route path='/surveys/new' element={<SurveyNew />} />
        </Routes>
      </div>
    );
  }
}

// const App = () => {
//   return (
//     <div className='container'>
//       <Header />
//       <Routes>
//         <Route path='/' element={<Landing />} />
//         <Route path='/surveys' element={<Dashboard />} />
//         <Route path='/surveys/new' element={<SurveyNew />} />
//       </Routes>
//     </div>
//   );
// };

export default connect(null, actions)(App);
