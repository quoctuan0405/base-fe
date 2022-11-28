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
    {
      id: 4,
      firstName: 'donna',
      lastName: 'fisher',
      age: 32,
    },
    {
      id: 5,
      firstName: 'howard',
      lastName: 'will',
      age: 27,
    },
    {
      id: 6,
      firstName: 'chris',
      lastName: 'harris',
      age: 28,
    },
    {
      id: 7,
      firstName: 'imani',
      lastName: 'thiel',
      age: 38,
    },
    {
      id: 8,
      firstName: 'flavie',
      lastName: 'armstrong',
      age: 24,
    },
    {
      id: 9,
      firstName: 'jo',
      lastName: 'wunsch',
      age: 48,
    },
    {
      id: 10,
      firstName: 'ana',
      lastName: 'moen',
      age: 48,
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
    updatePerson: (state, action: PayloadAction<UpdateCellDataPayload>) => {
      const { index, column, value } = action.payload;
      state.data[index][column] = value;
    },
    deletePerson: (state, action: PayloadAction<number[]>) => {
      state.data.filter(
        (person, index) => action.payload.indexOf(index) !== -1
      );
    },
  },
});

export const { updatePerson, deletePerson } = personSlice.actions;

export const selectAllPerson = (state: AppState) => {
  return state.person.present.data;
};

export default personSlice.reducer;
