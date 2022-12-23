import React, { useEffect, useState, useMemo } from 'react';
import {
  InputAdornment,
  MenuItem,
  Select,
  TableCell,
  TextField,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  Entry,
  selectAllStatus,
  StatusCode,
  updateEntry,
} from '../../../redux/reducer/entry';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

interface Props {
  value: number;
  rowIndex: number;
  columnId: string;
}

export const StatusCellWrapper: React.FC<Props> = React.memo(
  ({ value: initialValue, rowIndex, columnId }) => {
    const dispatch = useAppDispatch();
    const listStatus = useAppSelector(selectAllStatus);

    const statusMap: Record<number, StatusCode> = useMemo(() => {
      const statusMap: Record<number, StatusCode> = {};

      return listStatus.reduce((obj, item) => {
        return {
          ...obj,
          [item.id]: item.code,
        };
      }, statusMap);
    }, [listStatus]);

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
          onChange={(event) => setValue(event.target.value as number)}
          onClick={(event) => event.stopPropagation()}
          size="small"
          startAdornment={
            <InputAdornment position="start">
              {statusMap[value] === StatusCode.PAY ? (
                <CheckCircleIcon color="success" />
              ) : (
                <CancelIcon color="error" />
              )}
            </InputAdornment>
          }
        >
          {listStatus.map(({ id, code }) => (
            <MenuItem key={id} value={id}>
              {code}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
    );
  }
);
