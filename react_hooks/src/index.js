import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from './routes';
import history from './history';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import rootRedcuer from './reducers/index';

const storewithMiddleware = createStore(rootRedcuer,applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={storewithMiddleware}>
    <Router history={history}>
      <Routes/>
    </Router>
  </Provider>,
  document.getElementById('root')
);