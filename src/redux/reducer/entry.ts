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
  recipientIds = 'recipientIds',
  statusId = 'statusId',
  action = 'action',
}

export interface Category {
  [key: string]: any;
  id: number;
  name: string;
}

export interface Member {
  [key: string]: any;
  id: number;
  name: string;
}

export enum StatusCode {
  PAY = 'pay',
  NOT_PAY = 'notPay',
}

export interface Status {
  [key: string]: any;
  id: number;
  code: StatusCode;
}

export interface Entry {
  [key: string]: any;
  id: number;
  spendAt: string;
  description: string;
  categoryId: number;
  amount: number;
  spenderId: number;
  recipientIds: number[];
  statusId: number;
}

export interface EntryState {
  data: Entry[];
  members: Member[];
  categories: Category[];
  status: Status[];
  columnNameMapping: Record<EntryField, string>;
}

const initialState: EntryState = {
  columnNameMapping: {
    select: 'select',
    id: 'id',
    spendAt: 'spendAt',
    description: 'description',
    categoryId: 'category',
    amount: 'amount',
    spenderId: 'spender',
    recipientIds: 'recipient',
    statusId: 'status',
    action: 'action',
  },
  data: [
    {
      id: 1,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      categoryId: 1,
      amount: 10000,
      spenderId: 1,
      recipientIds: [1, 2, 3],
      statusId: 1,
    },
    {
      id: 2,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      categoryId: 2,
      amount: 10000,
      spenderId: 1,
      recipientIds: [2, 3, 4],
      statusId: 1,
    },
    {
      id: 3,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      categoryId: 3,
      amount: 10000,
      spenderId: 2,
      recipientIds: [2, 3, 4],
      statusId: 2,
    },
    {
      id: 4,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      categoryId: 3,
      amount: 10000,
      spenderId: 3,
      recipientIds: [1, 3, 4],
      statusId: 2,
    },
    {
      id: 5,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      categoryId: 1,
      amount: 10000,
      spenderId: 4,
      recipientIds: [1, 3, 5],
      statusId: 1,
    },
    {
      id: 6,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      categoryId: 2,
      amount: 10000,
      spenderId: 5,
      recipientIds: [1, 2, 3, 5],
      statusId: 1,
    },
    {
      id: 7,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      categoryId: 2,
      amount: 10000,
      spenderId: 5,
      recipientIds: [1, 2, 3, 5],
      statusId: 1,
    },
    {
      id: 8,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      categoryId: 2,
      amount: 10000,
      spenderId: 5,
      recipientIds: [1, 2, 3, 5],
      statusId: 1,
    },
    {
      id: 9,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      categoryId: 2,
      amount: 10000,
      spenderId: 5,
      recipientIds: [1, 2, 3, 5],
      statusId: 1,
    },
    {
      id: 10,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      categoryId: 2,
      amount: 10000,
      spenderId: 5,
      recipientIds: [1, 2, 3, 5],
      statusId: 1,
    },
    {
      id: 11,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      categoryId: 2,
      amount: 10000,
      spenderId: 5,
      recipientIds: [1, 2, 3, 5],
      statusId: 1,
    },
    {
      id: 12,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      categoryId: 2,
      amount: 10000,
      spenderId: 5,
      recipientIds: [1, 2, 3, 5],
      statusId: 1,
    },
    {
      id: 13,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      categoryId: 2,
      amount: 10000,
      spenderId: 5,
      recipientIds: [1, 2, 3, 5],
      statusId: 1,
    },
    {
      id: 14,
      spendAt: '2022-12-12',
      description: 'Cơm gà',
      categoryId: 2,
      amount: 10000,
      spenderId: 5,
      recipientIds: [1, 2, 3, 5],
      statusId: 1,
    },
  ],
  status: [
    {
      id: 1,
      code: StatusCode.PAY,
    },
    {
      id: 2,
      code: StatusCode.NOT_PAY,
    },
  ],
  members: [
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

export interface ToggleMemberPayload {
  index: number;
  value: number;
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
    toggleRecipient: (state, action: PayloadAction<ToggleMemberPayload>) => {
      const { index: rowIndex, value } = action.payload;

      const index =
        state.data[rowIndex][EntryField.recipientIds].indexOf(value);

      if (index === -1) {
        state.data[rowIndex][EntryField.recipientIds].push(value);
      } else {
        state.data[rowIndex][EntryField.recipientIds].splice(index, 1);
      }
    },
  },
});

export const { updateEntry, deleteEntry, toggleRecipient } =
  personSlice.actions;

export const selectAllEntries = (state: AppState) => {
  return state.entry.present.data;
};

export const selectColumnMapping = (state: AppState) => {
  return state.entry.present.columnNameMapping;
};

export const selectAllMembers = (state: AppState) => {
  return state.entry.present.members;
};

export const selectAllCategories = (state: AppState) => {
  return state.entry.present.categories;
};

export const selectAllStatus = (state: AppState) => {
  return state.entry.present.status;
};

export default personSlice.reducer;
