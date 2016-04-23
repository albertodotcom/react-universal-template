import React from 'react';
import { Router, Route } from 'react-router';
import App from './containers/App';

export const routes = (history) => {
  return (
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  );
};
