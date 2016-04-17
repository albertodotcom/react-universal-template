export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const RECEIVE_TODOS = 'RECEIVE_TODOS';

export function addTodo(text) {
  return {
    type: ADD_TODO,
    text,
  };
}

export function completeTodo(index) {
  return {
    type: COMPLETE_TODO,
    index,
  };
}

export function receiveTodos(todos) {
  return {
    type: RECEIVE_TODOS,
    todos,
  }
}

const todos = [
  {
    text: 'buy milk',
    completed: false,
  },
  {
    text: 'buy butter',
    completed: true,
  },
];

export function fetchTodos() {
  return (dispatch) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dispatch(receiveTodos(todos)));
      }, 500);
    });
  };
}
