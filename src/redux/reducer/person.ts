import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';

export interface Person {
  [key: string]: any;
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

export interface PersonState {
  data: Person[];
}

const initialState: PersonState = {
  data: [
    {
      id: 1,
      firstName: 'tanner',
      lastName: 'linsley',
      age: 24,
    },
    {
      id: 2,
      firstName: 'tanner',
      lastName: 'miller',
      age: 43,
    },
    {
      id: 3,
      firstName: 'joe',
      lastName: 'dirte',
      age: 42,
    },
  ],
};

export interface UpdateCellDataPayload {
  index: number;
  column: string;
  value: any;
}

export const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    updatePersonProperty: (
      state,
      action: PayloadAction<UpdateCellDataPayload>
    ) => {
      const { index, column, value } = action.payload;
      state.data[index][column] = value;
    },
  },
});

export const selectAllPerson = (state: AppState) => {
  return state.person.present.data;
};

export default personSlice.reducer;
