import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { completeTodo, fetchTodos } from '../../actions/todos.js';

import styleable from 'react-styleable';
import css from './App.scss';

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (id) => {
      dispatch(completeTodo(id));
    },
    fetchData: () => {
      dispatch(fetchTodos());
    },
  };
};

export class App extends React.Component {
  static fetchData(dispatch) {
    return dispatch(fetchTodos());
  }

  static propTypes = {
    todos: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    css: PropTypes.object.isRequired,
  };

  renderEl(todos, onClick) {
    return todos.map((todo, i) => {
      return (
        <li
            key={i}
            style={{textDecoration : todo.completed ? 'line-through' : 'none' }}
            onClick={() => onClick(i)}>
          {todo.text}
        </li>
      );
    });
  }

  render() {
    const { todos, onClick, css } = this.props;

    return (
      <div>
        <h1 className={css.app}>Universal App in React</h1>
        <ul>
          {this.renderEl(todos, onClick)}
        </ul>
      </div>
    );
  }
}

let styleableComponent = styleable(css)(App);

// TODO submit a PR to fix this quirk
styleableComponent.fetchData = App.fetchData;

export default connect(mapStateToProps, mapDispatchToProps)(styleableComponent);
