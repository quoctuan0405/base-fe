import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';

export enum PersonField {
  select = 'select',
  id = 'id',
  spendAt = 'spendAt',
  description = 'description',
  category = 'category',
  amount = 'amount',
  spender = 'spender',
  status = 'status',
  action = 'action',
}

export interface Person {
  [key: string]: any;
  id: number;
  spendAt: string;
  description: string;
  category: string;
  amount: number;
  spender: string;
  status: string;
}

export interface PersonState {
  data: Person[];
  columnNameMapping: Record<PersonField, string>;
}

const initialState: PersonState = {
  columnNameMapping: {
    select: 'Select',
    id: 'ID',
    spendAt: 'Spend at',
    description: 'Description',
    category: 'Category',
    amount: 'Amount',
    spender: 'Spender',
    status: 'Status',
    action: 'Action',
  },
  data: [
    {
      id: 1,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      category: 'Đi chợ',
      amount: 10000,
      spender: 'Trang',
      status: 'Đã pay',
    },
    {
      id: 2,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      category: 'Đi chợ',
      amount: 10000,
      spender: 'Trang',
      status: 'Đã pay',
    },
    {
      id: 3,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      category: 'Đi chợ',
      amount: 10000,
      spender: 'Trang',
      status: 'Đã pay',
    },
    {
      id: 4,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      category: 'Đi chợ',
      amount: 10000,
      spender: 'Trang',
      status: 'Đã pay',
    },
    {
      id: 5,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      category: 'Đi chợ',
      amount: 10000,
      spender: 'Trang',
      status: 'Đã pay',
    },
    {
      id: 6,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      category: 'Đi chợ',
      amount: 10000,
      spender: 'Trang',
      status: 'Đã pay',
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
      state.data = state.data.filter(
        (person, index) => action.payload.indexOf(index) === -1
      );
    },
  },
});

export const { updatePerson, deletePerson } = personSlice.actions;

export const selectAllPerson = (state: AppState) => {
  return state.person.present.data;
};

export const selectColumnMapping = (state: AppState) => {
  return state.person.present.columnNameMapping;
};

export default personSlice.reducer;
