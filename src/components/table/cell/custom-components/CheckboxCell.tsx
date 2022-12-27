import React from 'react';
import { TableCell, Checkbox, Box } from '@mui/material';

interface Props {
  selected: boolean;
  onChange: (event: unknown) => void;
}

export const CheckboxCell: React.FC<Props> = ({ selected, onChange }) => {
  return (
    <TableCell
      padding="checkbox"
      onClick={(event) => {
        if (event.target !== event.currentTarget) {
          event.stopPropagation();
        }
      }}
    >
      <Box sx={{ width: 'max-content', height: 'max-content', margin: 'auto' }}>
        <Checkbox checked={selected} onChange={onChange} />
      </Box>
    </TableCell>
  );
};

export const MemoizedCheckboxCell = React.memo(CheckboxCell);
