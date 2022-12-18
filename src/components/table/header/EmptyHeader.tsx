import React from 'react';
import { TableCell } from '@mui/material';
import { HeaderContext } from '@tanstack/react-table';
import { Entry } from '../../../redux/reducer/entry';

interface Props {
  headerId: string;
}

export const EmptyHeader: React.FC<Props> = React.memo(({ headerId }) => {
  return <TableCell key={headerId} padding="checkbox" />;
});
