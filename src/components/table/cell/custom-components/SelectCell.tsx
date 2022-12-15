import React from 'react';
import { TableCell, Checkbox } from '@mui/material';

interface Props {
  cellId: string;
  selected: boolean;
  onChange: (event: unknown) => void;
}

export const SelectCell: React.FC<Props> = ({ cellId, selected, onChange }) => {
  return (
    <TableCell key={cellId} padding="checkbox">
      <Checkbox
        checked={selected}
        onChange={onChange}
        onClick={(event) => event.stopPropagation()}
      />
    </TableCell>
  );
};

export const MemoizedSelectCell = React.memo(SelectCell);
