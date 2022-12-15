import React from 'react';
import { TableCell, IconButton } from '@mui/material';
import { HeaderContext } from '@tanstack/react-table';
import { Person } from '../../../redux/reducer/person';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface Props {
  headerContext: HeaderContext<Person, unknown>;
}

export const AddRowHeader: React.FC<Props> = React.memo(
  ({ headerContext: { header } }) => {
    return (
      <TableCell key={header.id} padding="checkbox" sx={{ userSelect: 'none' }}>
        <IconButton color="success">
          <AddCircleIcon />
        </IconButton>
      </TableCell>
    );
  }
);
