import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import App from './containers/App/App';

export default function Routes({history}) {
  return (
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  );
}

Routes.propTypes = {
  history: PropTypes.object.isRequired,
};
