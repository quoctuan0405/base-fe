import React from 'react';
import { TableCell } from '@mui/material';
import { HeaderContext } from '@tanstack/react-table';
import { Person } from '../../../redux/reducer/person';

interface Props {
  headerId: string;
}

export const EmptyHeader: React.FC<Props> = React.memo(({ headerId }) => {
  return <TableCell key={headerId} padding="checkbox" />;
});
