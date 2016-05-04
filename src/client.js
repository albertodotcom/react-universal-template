import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk';
import routes from './routes';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

// Create Redux store with initial state
const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(
      thunkMiddleware // lets us dispatch() functions
    ),
    devTools
  )
);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    {routes({history})}
  </Provider>,
  document.getElementById('root')
);
