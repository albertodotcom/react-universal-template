import { ADD_TODO, COMPLETE_TODO, RECEIVE_TODOS } from '../actions/todos.js';

export default function todos(state = [], action) {
  switch (action.type) {
    case RECEIVE_TODOS:
      return action.todos;
    case ADD_TODO:
      return [
        ...state,
        {
          completed: false,
          text: action.text,
        }
      ];
    case COMPLETE_TODO:
      return state.map((todo, i) => {
        if (i === action.index) {
          return {
            ...todo,
            completed: true,
          };
        }

        return todo;
      });
    default:
      return state;
  }
}
