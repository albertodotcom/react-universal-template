import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { completeTodo, fetchTodos } from '../actions/todos.js';

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
    fetchTodos: () => {
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
    onClick: PropTypes.function.isRequired,
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
    const { todos, onClick } = this.props;
    return (
      <div>
        <h1>Universal App in React</h1>
        <ul>
          {this.renderEl(todos, onClick)}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
