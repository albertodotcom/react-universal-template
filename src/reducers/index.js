import { combineReducers } from 'redux';
import todos from './todos.js';
import { routerReducer } from 'react-router-redux';

const app = combineReducers({
  todos,
  routing: routerReducer,
});

export default app;
