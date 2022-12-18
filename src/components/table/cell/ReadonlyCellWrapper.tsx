import React from 'react';
import { TableCell, Checkbox, TextField } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { Entry } from '../../../redux/reducer/entry';

interface Props {
  value: string | number | boolean;
}

export const ReadonlyCellWrapper: React.FC<Props> = React.memo(({ value }) => {
  return <TableCell>{value}</TableCell>;
});
