import React from 'react';
import { connect } from 'react-redux'
import { completeTodo } from '../actions/todos.js';

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (id) => {
      dispatch(completeTodo(id));
    },
  }
};

export class App extends React.Component {
  renderEl(todos, onClick) {
    return todos.map((todo, i) => {
      return (
        <li key={i}>{todo.text} - {todo.completed}</li>
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
