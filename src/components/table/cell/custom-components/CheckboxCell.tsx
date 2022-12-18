import React from 'react';
import { TableCell, Checkbox } from '@mui/material';

interface Props {
  cellId: string;
  selected: boolean;
  onChange: (event: unknown) => void;
}

export const CheckboxCell: React.FC<Props> = ({
  cellId,
  selected,
  onChange,
}) => {
  return (
    <TableCell key={cellId} padding="checkbox">
      <Checkbox checked={selected} onChange={onChange} />
    </TableCell>
  );
};

export const MemoizedCheckboxCell = React.memo(CheckboxCell);
