import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// DEV only!!! Axios helpers!
import axios from 'axios';
window.axios = axios;

const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// console.log('STRIPE KEY IS ', process.env.REACT_APP_STRIPE_KEY);
// process.env.NODE_ENV shows what environment is used, (development / production)
// console.log('Environment is ', process.env.NODE_ENV);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
