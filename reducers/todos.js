import { ADD_TODO, COMPLETE_TODO } from '../actions/todos.js';

const initialState = [
  {
    text: 'buy milk',
    completed: false,
  },
  {
    text: 'buy butter',
    completed: true,
  },
];

export default function todos(state = initialState, action) {
  switch (action.type) {
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
