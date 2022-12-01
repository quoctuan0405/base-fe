import { TableCell, Checkbox, TextField } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { Person } from '../../../redux/reducer/person';

interface Props {
  cellContext: CellContext<Person, string | number | boolean>;
}

export const ReadonlyCell: React.FC<Props> = ({
  cellContext: { getValue },
}) => {
  return <TableCell>{getValue()}</TableCell>;
};
