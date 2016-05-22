import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk';
import routes from './routes';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

// in development hot reload extracted css
if (process.env.NODE_ENV !== 'production') {
  const cssFileName = 'style.css';
  const originalCallback = window.webpackHotUpdate;
  let version = 0;

  window.webpackHotUpdate = (...args) => {
    const links = document.getElementsByTagName('link');
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      if (link.href.search(cssFileName) !== -1) {
        let linkHref = link.href;
        let indexOfVersion = linkHref.indexOf('?v');
        if (indexOfVersion !== -1) {
          linkHref = link.href.substring(indexOfVersion, -1);
        }

        link.href = `${linkHref}?v=${version}`;

        version = version + 1;
        originalCallback(...args);
        return;
      }
    }
  };
}

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
