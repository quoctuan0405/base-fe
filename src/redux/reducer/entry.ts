import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';

export enum EntryField {
  select = 'select',
  id = 'id',
  spendAt = 'spendAt',
  description = 'description',
  categoryId = 'categoryId',
  amount = 'amount',
  spenderId = 'spenderId',
  status = 'status',
  action = 'action',
}

export interface Category {
  [key: string]: any;
  id: number;
  name: string;
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
  categoryId: number;
  amount: number;
  spenderId: number;
  status: string;
}

export interface EntryState {
  data: Entry[];
  spenders: Spender[];
  categories: Category[];
  columnNameMapping: Record<EntryField, string>;
}

const initialState: EntryState = {
  columnNameMapping: {
    select: 'Select',
    id: 'ID',
    spendAt: 'Spend at',
    description: 'Description',
    categoryId: 'Category',
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
      categoryId: 1,
      amount: 10000,
      spenderId: 1,
      status: 'Đã pay',
    },
    {
      id: 2,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      categoryId: 2,
      amount: 10000,
      spenderId: 1,
      status: 'Đã pay',
    },
    {
      id: 3,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      categoryId: 3,
      amount: 10000,
      spenderId: 2,
      status: 'Đã pay',
    },
    {
      id: 4,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      categoryId: 3,
      amount: 10000,
      spenderId: 3,
      status: 'Đã pay',
    },
    {
      id: 5,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      categoryId: 1,
      amount: 10000,
      spenderId: 4,
      status: 'Đã pay',
    },
    {
      id: 6,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      categoryId: 2,
      amount: 10000,
      spenderId: 5,
      status: 'Đã pay',
    },
  ],
  spenders: [
    {
      id: 1,
      name: 'Trang',
    },
    {
      id: 2,
      name: 'Hoàng',
    },
    {
      id: 3,
      name: 'Tiến',
    },
    {
      id: 4,
      name: 'Hiếu',
    },
    {
      id: 5,
      name: 'Thanh',
    },
  ],
  categories: [
    {
      id: 1,
      name: 'Đi chợ',
    },
    {
      id: 2,
      name: 'Mua sắm',
    },
    {
      id: 3,
      name: 'Hóa đơn',
    },
    {
      id: 4,
      name: 'Ăn ngoài',
    },
  ],
};

export interface UpdateCellDataPayload {
  index: number;
  column: string;
  value: any;
}

export const personSlice = createSlice({
  name: 'entry',
  initialState,
  reducers: {
    updateEntry: (state, action: PayloadAction<UpdateCellDataPayload>) => {
      const { index, column, value } = action.payload;
      state.data[index][column] = value;
    },
    deleteEntry: (state, action: PayloadAction<number[]>) => {
      state.data = state.data.filter(
        (entry, index) => action.payload.indexOf(index) === -1
      );
    },
  },
});

export const { updateEntry, deleteEntry } = personSlice.actions;

export const selectAllEntries = (state: AppState) => {
  return state.entry.present.data;
};

export const selectColumnMapping = (state: AppState) => {
  return state.entry.present.columnNameMapping;
};

export const selectAllSpenders = (state: AppState) => {
  return state.entry.present.spenders;
};

export const selectAllCategories = (state: AppState) => {
  return state.entry.present.categories;
};

export default personSlice.reducer;
