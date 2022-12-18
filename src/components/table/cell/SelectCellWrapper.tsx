import React from 'react';
import { MenuItem, Select, TableCell, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Entry, updateEntry } from '../../../redux/reducer/entry';
import { useAppDispatch } from '../../../redux/hooks';

export interface Option {
  id: string | number;
  name: string;
}

interface Props {
  options: Option[];
  value: Option['id'];
  rowIndex: number;
  columnId: string;
}

export const SelectCellWrapper: React.FC<Props> = React.memo(
  ({ value: initialValue, rowIndex, columnId, options }) => {
    const dispatch = useAppDispatch();

    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      dispatch(
        updateEntry({
          column: columnId,
          index: rowIndex,
          value: value,
        })
      );
    };

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <TableCell>
        <Select
          fullWidth
          value={value}
          variant="outlined"
          onBlur={onBlur}
          onChange={(event) => setValue(event.target.value)}
          onClick={(event) => event.stopPropagation()}
          size="small"
        >
          {options.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
    );
  }
);
