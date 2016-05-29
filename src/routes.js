import React, { PropTypes } from 'react';
import { Router, Route, Link } from 'react-router';
import App from './containers/App/App';

function Test() {
  return (
    <div>Hello from test<Link to='/'>Home</Link></div>
  );
}

export default function Routes({history}) {
  return (
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/test" component={Test} />
    </Router>
  );
}

Routes.propTypes = {
  history: PropTypes.object.isRequired,
};
