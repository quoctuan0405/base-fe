import React from 'react';
import { TableCell, Checkbox, TextField } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { Entry, updateEntry } from '../../../redux/reducer/entry';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useAppDispatch } from '../../../redux/hooks';
import { DatePicker } from '@mui/x-date-pickers';

interface Props {
  value: string | number | boolean;
  rowIndex: number;
  columnId: string;
}

export const DatePickerCellWrapper: React.FC<Props> = React.memo(
  ({ value, rowIndex, columnId }) => {
    const dispatch = useAppDispatch();

    const onChange = (value: string | number | boolean) => {
      dispatch(
        updateEntry({
          column: columnId,
          index: rowIndex,
          value: value,
        })
      );
    };

    return (
      <TableCell
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            value={value}
            onChange={(newValue) => newValue && onChange(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                }}
              />
            )}
          />
        </LocalizationProvider>
      </TableCell>
    );
  }
);
