import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';

export interface TodoState {
  todos: string[];
}

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push(action.payload);
    },
    removeTodos: (state, action: PayloadAction<number[]>) => {
      state.todos = state.todos.filter(
        (_, index) => !action.payload.includes(index)
      );
    },
  },
});

export const { addTodo, removeTodos } = todoSlice.actions;

export const selectTodos = (state: AppState) => state.todo.present.todos;

export default todoSlice.reducer;
