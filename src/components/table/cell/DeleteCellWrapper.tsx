import React from 'react';
import { TableCell, IconButton } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { deleteEntry, Entry } from '../../../redux/reducer/entry';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../../../redux/hooks';

interface Props {
  rowId: string;
  rowIndex: number;
}

export const DeleteCellWrapper: React.FC<Props> = React.memo(
  ({ rowId, rowIndex }) => {
    const dispatch = useAppDispatch();

    return (
      <TableCell key={rowId} padding="checkbox">
        <IconButton
          color="error"
          onClick={(event) => {
            dispatch(deleteEntry([rowIndex]));
            event.stopPropagation();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    );
  }
);
