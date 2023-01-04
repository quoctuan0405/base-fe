import React from 'react';
import { InputAdornment, TableCell, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Entry, updateEntry } from '../../../redux/reducer/entry';
import { useAppDispatch } from '../../../redux/hooks';
import { CurrencyInput } from './custom-components/CurrencyInput';

interface Props {
  value: string | number | boolean;
  rowIndex: number;
  columnId: string;
}

export const EditableCurrencyCellWrapper: React.FC<Props> = React.memo(
  ({ value: initialValue, rowIndex, columnId }) => {
    const dispatch = useAppDispatch();

    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue);

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
        <TextField
          fullWidth
          value={value}
          variant="outlined"
          onBlur={onBlur}
          onChange={(event) => setValue(event.target.value)}
          onClick={(event) => event.stopPropagation()}
          size="small"
          InputProps={{
            endAdornment: 'đ',
            inputComponent: CurrencyInput as any,
          }}
        />
      </TableCell>
    );
  }
);
