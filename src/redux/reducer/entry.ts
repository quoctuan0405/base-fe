import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';

export enum EntryField {
  select = 'select',
  id = 'id',
  spendAt = 'spendAt',
  description = 'description',
  category = 'category',
  amount = 'amount',
  spenderId = 'spenderId',
  status = 'status',
  action = 'action',
}

export interface Spender {
  [key: string]: any;
  id: number;
  name: string;
}

export interface Entry {
  [key: string]: any;
  id: number;
  spendAt: string;
  description: string;
  category: string;
  amount: number;
  spenderId: number;
  status: string;
}

export interface EntryState {
  data: Entry[];
  spenderMap: Record<number, Spender>;
  columnNameMapping: Record<EntryField, string>;
}

const initialState: EntryState = {
  columnNameMapping: {
    select: 'Select',
    id: 'ID',
    spendAt: 'Spend at',
    description: 'Description',
    category: 'Category',
    amount: 'Amount',
    spenderId: 'Spender',
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
      spenderId: 1,
      status: 'Đã pay',
    },
    {
      id: 2,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      category: 'Đi chợ',
      amount: 10000,
      spenderId: 1,
      status: 'Đã pay',
    },
    {
      id: 3,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      category: 'Đi chợ',
      amount: 10000,
      spenderId: 2,
      status: 'Đã pay',
    },
    {
      id: 4,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      category: 'Đi chợ',
      amount: 10000,
      spenderId: 3,
      status: 'Đã pay',
    },
    {
      id: 5,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      category: 'Đi chợ',
      amount: 10000,
      spenderId: 4,
      status: 'Đã pay',
    },
    {
      id: 6,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      category: 'Đi chợ',
      amount: 10000,
      spenderId: 5,
      status: 'Đã pay',
    },
  ],
  spenderMap: {
    1: {
      id: 1,
      name: 'Trang',
    },
    2: {
      id: 2,
      name: 'Hoàng',
    },
    3: {
      id: 3,
      name: 'Tiến',
    },
    4: {
      id: 4,
      name: 'Hiếu',
    },
    5: {
      id: 5,
      name: 'Thanh',
    },
  },
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
    updateEntry: (state, action: PayloadAction<UpdateCellDataPayload>) => {
      const { index, column, value } = action.payload;
      state.data[index][column] = value;
    },
    deleteEntry: (state, action: PayloadAction<number[]>) => {
      state.data = state.data.filter(
        (person, index) => action.payload.indexOf(index) === -1
      );
    },
  },
});

export const { updateEntry, deleteEntry } = personSlice.actions;

export const selectAllPerson = (state: AppState) => {
  return state.entry.present.data;
};

export const selectColumnMapping = (state: AppState) => {
  return state.entry.present.columnNameMapping;
};

export const selectSpenderMap = (state: AppState) => {
  return state.entry.present.spenderMap;
};

export default personSlice.reducer;
