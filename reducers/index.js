import { combineReducers } from 'redux';
import todos from './todos.js';

const app = combineReducers({
  todos,
});

export default app;
