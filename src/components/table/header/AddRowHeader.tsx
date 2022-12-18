import React from 'react';
import { TableCell, IconButton } from '@mui/material';
import { HeaderContext } from '@tanstack/react-table';
import { Entry } from '../../../redux/reducer/entry';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface Props {
  headerContext: HeaderContext<Entry, unknown>;
}

export const AddRowHeader: React.FC<Props> = React.memo(
  ({ headerContext: { header } }) => {
    return (
      <TableCell
        key={header.id}
        padding="checkbox"
        sx={{ minWidth: header.getSize(), userSelect: 'none' }}
      >
        <IconButton color="success">
          <AddCircleIcon />
        </IconButton>
      </TableCell>
    );
  }
);
